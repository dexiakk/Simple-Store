from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(write_only=True, required=True)
    lastName = serializers.CharField(write_only=True, required=True)
    preferedGender = serializers.ChoiceField(choices=UserDetails.GENDER_CHOICES, write_only=True, required=True)
    dateOfBirth = serializers.DateField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ["id", "username", "password", "firstName", "lastName", "preferedGender", "dateOfBirth"]
        extra_kwargs = {"password": {"write_only": True}}
        

    def create(self, validated_data):
        firstName = validated_data.pop("firstName")
        lastName = validated_data.pop("lastName")
        preferedGender = validated_data.pop("preferedGender")
        dateOfBirth = validated_data.pop("dateOfBirth")
        
        user = User.objects.create_user(**validated_data)

        UserDetails.objects.create(
            user=user,
            firstName=firstName,
            lastName=lastName,
            preferedGender=preferedGender,
            dateOfBirth=dateOfBirth
        )

        return user
    
class UserDetailsSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    
    class Meta:
        model = UserDetails
        fields = ['username', 'firstName', 'lastName', 'preferedGender', 'dateOfBirth', 'created_at', 'avatar']
        read_only_fields = ['user', 'dateOfBirth', 'created_at']

    def get_username(self, obj):
        return obj.user.username if obj.user else None
    
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'house_number', 'city', 'postal_code', 'country']
        
class ShoeImageGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoeImageGallery
        fields = ['id', 'image1', 'image2', 'image3', 'image4']
        
class ShoeVariantSerializer(serializers.ModelSerializer):
    color = serializers.StringRelatedField()
    images_gallery = ShoeImageGallerySerializer(many=True, read_only=True)
    
    class Meta:
        model = ShoeVariant
        fields = ['id', 'color', 'main_image', 'images_gallery']
        
class ShoesSerializer(serializers.ModelSerializer):
    manufacturer = serializers.StringRelatedField()
    variants = ShoeVariantSerializer(many=True, read_only=True)
    shoe_high = serializers.CharField(source='get_shoe_high_display')
    colors = serializers.SerializerMethodField()
    shoe_gallery = ShoeImageGallerySerializer(many=True, read_only=True) 

    class Meta:
        model = Shoe
        fields = [
            'id', 'manufacturer', 'model', 'price', 'description',
            'bestseller', 'gender', 'shoe_high', 'variants', 'colors', 'shoe_gallery'
        ]
        
    def get_colors(self, obj):
        # Zwracamy unikalne kolory z powiązanych wariantów
        return [variant.color.name for variant in obj.variants.all()]