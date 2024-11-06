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
        fields = ['username', 'firstName', 'lastName', 'preferedGender', 'dateOfBirth', 'created_at']
        read_only_fields = ['user', 'dateOfBirth', 'created_at']

    def get_username(self, obj):
        return obj.user.username if obj.user else None