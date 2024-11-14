from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from django.contrib.auth.models import User
from .models import *
from .serializers import UserSerializer, UserDetailsSerializer, AddressSerializer, ShoesSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
import os

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class UserDetailsList(generics.ListAPIView):
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserDetails.objects.filter(user=self.request.user)
    
class UserDetailsPartialUpdateView(generics.UpdateAPIView):
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return UserDetails.objects.get(user=self.request.user)

    def patch(self, request, *args, **kwargs):
        user_details = self.get_object()
        serializer = self.get_serializer(user_details, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, *args, **kwargs):
        user_details = self.get_object()
        old_avatar = user_details.avatar

        serializer = self.get_serializer(user_details, data=request.data, partial=True)

        if serializer.is_valid():
            if old_avatar and os.path.isfile(old_avatar.path):
                os.remove(old_avatar.path)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AddressListCreate(generics.ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)
    
class AddressPartialUpdateView(generics.UpdateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        address_id = self.kwargs['id']
        
        try:
            return Address.objects.get(id=address_id, user=self.request.user)
        except Address.DoesNotExist:
            raise Http404("Address not found")
    
    def patch(self, request, *args, **kwargs):
        user_address = self.get_object()
        serializer = self.get_serializer(user_address, data = request.data, partial = True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AddressDeleteView(generics.DestroyAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        address_id = self.kwargs['id']
        try:
            return Address.objects.get(id=address_id, user=self.request.user)
        except Address.DoesNotExist:
            raise Http404("Address not found")
        
class ShoesList(generics.ListAPIView):
    serializer_class = ShoesSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Shoe.objects.all()
