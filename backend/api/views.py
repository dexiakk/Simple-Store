from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from django.contrib.auth.models import User
from .models import *
from .serializers import UserSerializer, UserDetailsSerializer, AddressSerializer, ShoeSerializer, ShoeOnSaleSerializer, ShoeFiltersSerializer, ShoeSizesSerializer, CartSerializer, OrdersCreateSerializer, OrdersSerializer, UsersQuestionsSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.exceptions import PermissionDenied
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
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
        new_password = request.data.get("password", None)

        if new_password:
            user = self.request.user
            user.set_password(new_password)
            user.save()

        serializer = self.get_serializer(
            user_details, data=request.data, partial=True)

        if serializer.is_valid():
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
        serializer = self.get_serializer(
            user_address, data=request.data, partial=True)

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


class ShoeList(generics.ListAPIView):
    serializer_class = ShoeSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_queryset(self):
        queryset = Shoe.objects.all()

        category_names = self.request.query_params.getlist('category')
        color_names = self.request.query_params.getlist('color')
        collection_names = self.request.query_params.getlist('collection')
        shoe_high = self.request.query_params.getlist('shoe_high')
        gender = self.request.query_params.getlist('gender')
        shoe_ids = self.request.query_params.getlist('id')

        if category_names:
            queryset = queryset.filter(category__name__in=category_names)
        if color_names:
            queryset = queryset.filter(variants__color__name__in=color_names)
        if collection_names:
            queryset = queryset.filter(collection__name__in=collection_names)
        if shoe_high:
            queryset = queryset.filter(shoe_high__in=shoe_high)
        if gender:
            queryset = queryset.filter(gender__in=gender)
        if shoe_ids:
            queryset = queryset.filter(id__in=shoe_ids)

        return queryset.distinct()

class ShoeListOnSaleView(generics.ListAPIView):
    serializer_class = ShoeOnSaleSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_queryset(self):
        queryset = Shoe.objects.filter(on_sale=True)

        return queryset.distinct()

class ShoeFiltersView(generics.ListAPIView):
    serializer_class = ShoeFiltersSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_queryset(self):
        categories = list(
            ShoeCategories.objects.values_list('name', flat=True))
        collections = list(
            ShoeCollections.objects.values_list('name', flat=True))
        colors = list(ShoeColors.objects.values_list('name', flat=True))
        shoe_high = [choice[0] for choice in Shoe.SHOE_HIGH_CHOICES]
        genders = [choice[0] for choice in Shoe.GENDER_CHOICES]

        filters_data = {
            "categories": categories,
            "colors": colors,
            "collections": collections,
            "shoe_high": shoe_high,
            "genders": genders,
        }

        return [filters_data]
    
class ShoeSizesList(generics.ListAPIView):
    serializer_class = ShoeSizesSerializer
    permission_classes = []
    
    def get_queryset(self):
        return ShoeSizes.objects.all()
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response([size.size for size in queryset])


class CartList(generics.ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class CartPartialUpdate(generics.UpdateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        try:
            cart = Cart.objects.get(user=self.request.user)
        except Cart.DoesNotExist:
            raise Http404("Koszyk nie został znaleziony")

        if cart.user != self.request.user:
            raise PermissionDenied("Nie masz dostępu do tego koszyka.")

        return cart
    
class OrderCreate(generics.CreateAPIView):
    serializer_class = OrdersCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrdersList(generics.ListAPIView):
    serializer_class = OrdersSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Orders.objects.all()
    
class OrdersPartialUpdate(generics.UpdateAPIView):
    serializer_class = OrdersSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        order_id = self.kwargs['id']
        try:
            orders = Orders.objects.get(id=order_id)
        except Orders.DoesNotExist:
            raise Http404("Order doesnt exist")

        return orders
    
class UserQuestionCreate(generics.CreateAPIView):
    queryset = UsersQuestions.objects.all()
    serializer_class = UsersQuestionsSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

class UsersQuestionsList(generics.ListAPIView):
    serializer_class = UsersQuestionsSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get_queryset(self):
        return UsersQuestions.objects.all()
    
class QuestionsPartialUpdate(generics.UpdateAPIView):
    serializer_class = UsersQuestionsSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        question_id = self.kwargs['id']
        try:
            orders = UsersQuestions.objects.get(id=question_id)
        except UsersQuestions.DoesNotExist:
            raise Http404("Question doesnt exist")

        return orders