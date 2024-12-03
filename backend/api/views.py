from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from django.contrib.auth.models import User
from .models import *
from .serializers import UserSerializer, UserDetailsSerializer, AddressSerializer, ShoeSerializer, ShoeCreateSerializer, ShoeToEditSerializer, ShoePartialUpdateSerializer, ShoeOnSaleSerializer, ShoeFiltersSerializer, ShoeFiltersWithIDsSerializer, ShoeSizesSerializer, ShoeSizesWithIdSerializer, CartSerializer, OrdersCreateSerializer, OrdersSerializer, UsersQuestionsSerializer, ShoeImageGallerySerializer, ShoeVariantSerializer
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
    
class ShoeToEditView(generics.RetrieveAPIView):
    serializer_class = ShoeToEditSerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    queryset = Shoe.objects.all()
    lookup_field = 'id'

    def get_object(self):
        try:
            return Shoe.objects.get(id=self.kwargs['id'])
        except Shoe.DoesNotExist:
            raise Http404("Shoe not found")

class ShoeCreateView(generics.CreateAPIView):
    serializer_class = ShoeCreateSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = []
    
    queryset = Shoe.objects.all()
    

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
        manufacturers = list(Manufacturers.objects.values_list('brand', flat=True))

        filters_data = {
            "categories": categories,
            "colors": colors,
            "collections": collections,
            "shoe_high": shoe_high,
            "genders": genders,
            "manufacturers": manufacturers,
        }

        return [filters_data]
    
class ShoeFiltersWithIDsView(generics.ListAPIView):
    serializer_class = ShoeFiltersWithIDsSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_queryset(self):
        categories = list(
            ShoeCategories.objects.values('id', 'name')
        )
        collections = list(
            ShoeCollections.objects.values('id', 'name')
        )
        colors = list(
            ShoeColors.objects.values('id', 'name')
        )
        shoe_high = [
            {"id": key, "name": value} for key, value in Shoe.SHOE_HIGH_CHOICES
        ]
        genders = [
            {"id": key, "name": value} for key, value in Shoe.GENDER_CHOICES
        ]
        manufacturers = list(
            Manufacturers.objects.values("id", "brand")
        )

        filters_data = {
            "categories": categories,
            "colors": colors,
            "collections": collections,
            "shoe_high": shoe_high,
            "genders": genders,
            "manufacturers": manufacturers,
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
    
class ShoeSizesWithIdList(generics.ListAPIView):
    serializer_class = ShoeSizesWithIdSerializer
    permission_classes = []

    def get_queryset(self):
        return ShoeSizes.objects.all()
    


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
    
class ShoeImageGalleryCreate(generics.ListCreateAPIView):
    serializer_class = ShoeImageGallerySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ShoeImageGallery.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
            
class ShoeVariantCreateView(generics.ListCreateAPIView):
    serializer_class = ShoeVariantSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return ShoeVariant.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
            
class ShoePartialUpdateView(generics.UpdateAPIView):
    serializer_class = ShoePartialUpdateSerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    queryset = Shoe.objects.all()
    lookup_field = 'id'

    def get_queryset(self):
        return super().get_queryset()
    
class ShoeVariantPartialUpdateView(generics.UpdateAPIView):
    serializer_class = ShoeVariantSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_object(self):
        variant_id = self.kwargs['id']
        try:
            return ShoeVariant.objects.get(id=variant_id)
        except ShoeVariant.DoesNotExist:
            raise Http404("Shoe variant not found")

    def patch(self, request, *args, **kwargs):
        shoe_variant = self.get_object()
        serializer = self.get_serializer(shoe_variant, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ShoeImageGalleryPartialUpdateView(generics.UpdateAPIView):
    serializer_class = ShoeImageGallerySerializer
    permission_classes = [AllowAny]

    def get_object(self):
        gallery_id = self.kwargs['id']
        try:
            return ShoeImageGallery.objects.get(id=gallery_id)
        except ShoeImageGallery.DoesNotExist:
            raise Http404("Shoe image gallery not found")

    def patch(self, request, *args, **kwargs):
        shoe_image_gallery = self.get_object()
        serializer = self.get_serializer(shoe_image_gallery, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ShoeImageGalleryToEditView(generics.RetrieveAPIView):
    serializer_class = ShoeImageGallerySerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    queryset = ShoeImageGallery.objects.all()
    lookup_field = 'id'

    def get_object(self):
        try:
            return ShoeImageGallery.objects.get(id=self.kwargs['id'])
        except ShoeImageGallery.DoesNotExist:
            raise Http404("Shoe not found")
        
class ShoeVariantToEditView(generics.RetrieveAPIView):
    serializer_class = ShoeVariantSerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    queryset = ShoeVariant.objects.all()
    lookup_field = 'id'

    def get_object(self):
        try:
            return ShoeVariant.objects.get(id=self.kwargs['id'])
        except ShoeVariant.DoesNotExist:
            raise Http404("Shoe not found")