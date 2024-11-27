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
        fields = ['permissions','username', 'firstName', 'lastName', 'preferedGender', 'dateOfBirth', 'created_at', 'avatar']
        read_only_fields = ['permissions', 'user', 'dateOfBirth', 'created_at']

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
        
    def get_color(self, obj):
        return {
            "name": obj.color.name,
            "value": obj.color.color,
        }
    
class ShoeSizesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoeSizes
        fields = ['size']
        
class ShoeSerializer(serializers.ModelSerializer):
    manufacturer = serializers.StringRelatedField()
    variants = ShoeVariantSerializer(many=True, read_only=True)
    shoe_high = serializers.CharField(source='get_shoe_high_display')
    colors = serializers.SerializerMethodField()
    shoe_sizes = ShoeSizesSerializer(many=True, read_only=True)
    shoe_gallery = ShoeImageGallerySerializer(many=True, read_only=True)

    class Meta:
        model = Shoe
        fields = [
            'id', 'manufacturer', 'model', 'price', 'description', 'shoe_sizes',
            'bestseller', 'gender', 'shoe_high', 'variants', 'colors', 'shoe_gallery', 'category', 'collection', 
        ]
        
    def get_colors(self, obj):
        return [
            {
                "name": variant.color.name,
                "value": variant.color.color,
            }
            for variant in obj.variants.all()
        ]
        
class ShoeFiltersSerializer(serializers.Serializer):
    categories = serializers.ListField(child=serializers.CharField())
    colors = serializers.ListField(child=serializers.CharField())
    collections = serializers.ListField(child=serializers.CharField())
    shoe_high = serializers.ListField(child=serializers.CharField())
    genders = serializers.ListField(child=serializers.CharField())
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        return {
            "category": representation.get("categories", []),
            "color": representation.get("colors", []),
            "collection": representation.get("collections", []),
            "shoe_high": representation.get("shoe_high", []), 
            "gender": representation.get("genders", []),
        }
    
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['item1', 'item1_variant', 'item1_size', 
                  'item2', 'item2_variant', 'item2_size', 
                  'item3', 'item3_variant', 'item3_size', 
                  'item4', 'item4_variant', 'item4_size']