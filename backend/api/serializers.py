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
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    
    class Meta:
        model = UserDetails
        fields = ['user_id', 'permissions','username', 'firstName', 'lastName', 'preferedGender', 'dateOfBirth', 'created_at', 'avatar']
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
        
class ShoeSizesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoeSizes
        fields = ["size"]
        
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
        
class ShoeSizesWithIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoeSizes
        fields = ['id', 'size']   
        
        
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
            'bestseller', 'gender', 'shoe_high', 'on_sale', 'sale_price', 'variants', 'colors', 'shoe_gallery', 'category', 'collection', 
        ]
        
    def get_colors(self, obj):
        return [
            {
                "name": variant.color.name,
                "value": variant.color.color,
            }
            for variant in obj.variants.all()
        ]
        
class ShoeCreateSerializer(serializers.ModelSerializer):
    shoe_sizes = serializers.PrimaryKeyRelatedField(queryset=ShoeSizes.objects.all(), many=True)
    manufacturer = serializers.PrimaryKeyRelatedField(queryset=Manufacturers.objects.all())
    category = serializers.PrimaryKeyRelatedField(queryset=ShoeCategories.objects.all())
    collection = serializers.PrimaryKeyRelatedField(queryset=ShoeCollections.objects.all())

    class Meta:
        model = Shoe
        fields = '__all__'

    def validate(self, data):
        if data['sale_price'] and not data['on_sale']:
            raise serializers.ValidationError("Sale price should only be set if 'on_sale' is True.")
        return data
    
class ShoePartialUpdateSerializer(serializers.ModelSerializer):
    manufacturer = serializers.PrimaryKeyRelatedField(queryset=Manufacturers.objects.all(), required=False)
    shoe_sizes = serializers.PrimaryKeyRelatedField(queryset=ShoeSizes.objects.all(), many=True, required=False)
    category = serializers.PrimaryKeyRelatedField(queryset=ShoeCategories.objects.all(), required=False)
    collection = serializers.PrimaryKeyRelatedField(queryset=ShoeCollections.objects.all(), required=False)
    model = serializers.CharField(max_length=50, required=False)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    description = serializers.CharField(required=False)
    bestseller = serializers.BooleanField(required=False)
    gender = serializers.ChoiceField(choices=Shoe.GENDER_CHOICES, required=False)
    shoe_high = serializers.ChoiceField(choices=Shoe.SHOE_HIGH_CHOICES, required=False)
    on_sale = serializers.BooleanField(required=False)
    sale_price = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, allow_null=True)  # Allow null for sale_price

    class Meta:
        model = Shoe
        fields = [
            'manufacturer',
            'shoe_sizes',
            'category',
            'collection',
            'model',
            'price',
            'description',
            'bestseller',
            'gender',
            'shoe_high',
            'on_sale',
            'sale_price',
        ]
    
class ShoeOnSaleSerializer(serializers.ModelSerializer):
    manufacturer = serializers.StringRelatedField()
    colors = serializers.SerializerMethodField()
    shoe_high = serializers.CharField(source='get_shoe_high_display')
    shoe_sizes = serializers.PrimaryKeyRelatedField(queryset=ShoeSizes.objects.all(), many=True)
    variants = ShoeVariantSerializer(many=True, read_only=True)
    shoe_gallery = serializers.PrimaryKeyRelatedField(queryset=ShoeImageGallery.objects.all(), many=True, required=False)

    class Meta:
        model = Shoe
        fields = [
            'id', 'manufacturer', 'model', 'price', 'description', 'bestseller',
            'gender', 'shoe_high', 'shoe_sizes', 'variants', 'colors', 'shoe_gallery', 'category', 'collection', 'on_sale', 'sale_price'
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
    manufacturers = serializers.ListField(child=serializers.CharField())
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        return {
            "category": representation.get("categories", []),
            "color": representation.get("colors", []),
            "collection": representation.get("collections", []),
            "shoe_high": representation.get("shoe_high", []), 
            "gender": representation.get("genders", []),
            "manufacturer": representation.get("manufacturers", [])
        }
        
class ShoeFiltersWithIDsSerializer(serializers.Serializer):
    categories = serializers.ListField(child=serializers.CharField())
    colors = serializers.ListField(child=serializers.CharField())
    collections = serializers.ListField(child=serializers.CharField())
    shoe_high = serializers.ListField(child=serializers.CharField())
    genders = serializers.ListField(child=serializers.CharField())
    manufacturers = serializers.ListField(child=serializers.CharField())
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        return {
            "category": representation.get("categories", []),
            "color": representation.get("colors", []),
            "collection": representation.get("collections", []),
            "shoe_high": representation.get("shoe_high", []),
            "gender": representation.get("genders", []),
            "manufacturer": representation.get("manufacturers", [])
        }
    
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['item1', 'item1_variant', 'item1_size', 
                  'item2', 'item2_variant', 'item2_size', 
                  'item3', 'item3_variant', 'item3_size', 
                  'item4', 'item4_variant', 'item4_size']
        
class OrdersSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    firstName = serializers.CharField(source='user_details.firstName', read_only=True)
    lastName = serializers.CharField(source='user_details.lastName', read_only=True)
    address = AddressSerializer()
    admin_accepted_by = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        allow_null=True,
        required=False
    )
    admin_accepted_by_username = serializers.SerializerMethodField()

    class Meta:
        model = Orders
        fields = [
            'id', 'user', 'firstName', 'lastName', 'address', 'item1', 'item1_variant', 'item1_size',
            'item2', 'item2_variant', 'item2_size', 'item3', 'item3_variant', 'item3_size', 
            'item4', 'item4_variant', 'item4_size', 'admin_accepted', 'admin_accepted_by', 'admin_accepted_by_username', 'shipped', 'created_at',
        ]
        
    def get_admin_accepted_by_username(self, obj):
        return obj.admin_accepted_by.username if obj.admin_accepted_by else None
    
class OrdersCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = [
            'user',
            'user_details',
            'address',
            'item1',
            'item1_variant',
            'item1_size',
            'item2',
            'item2_variant',
            'item2_size',
            'item3',
            'item3_variant',
            'item3_size',
            'item4',
            'item4_variant',
            'item4_size',
            'admin_accepted',
            'admin_accepted_by',
            'shipped',
        ]

    def create(self, validated_data):
        user = self.context['request'].user
        
        validated_data['user'] = user
        
        validated_data['user_details'] = UserDetails.objects.get(user=user)
        
        return super().create(validated_data)
    
class UsersQuestionsSerializer(serializers.ModelSerializer):
    admin_solved_by = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        allow_null=True,
        required=False
    )
    admin_solved_by_username = serializers.SerializerMethodField()
    
    class Meta:
        model = UsersQuestions
        fields = ['id', 'user_email', 'user_firstName', 'user_lastName', 'subject', 'description', 'admin_solved', 'admin_solved_by', 'admin_solved_by_username']
    
    def get_admin_solved_by_username(self, obj):
        return obj.admin_solved_by.username if obj.admin_solved_by else None
    
class ShoeImageGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoeImageGallery
        fields = ['id', 'color', 'image1', 'image2', 'image3', 'image4', 'shoe']
        
class ShoeVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoeVariant
        fields = ['id', 'shoe', 'color', 'main_image', 'images_gallery']
        
class ShoeToEditSerializer(serializers.ModelSerializer):
    shoe_sizes = serializers.PrimaryKeyRelatedField(queryset=ShoeSizes.objects.all(), many=True)
    
    class Meta:
        model = Shoe
        fields = ['id', 'model', 'price', 'description', 'bestseller', 'gender', 'shoe_high', 'category', 'collection', 'manufacturer', 'on_sale', 'sale_price', 'shoe_sizes']