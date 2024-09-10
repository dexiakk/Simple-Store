from rest_framework import viewsets
from .models import *
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ShoeSerializer, ManufacturerSerializer, ColorSerializer , CategorySerializer , CollectionSerializer
from .filters import ShoeFilter

class ShoeViewSet(viewsets.ModelViewSet):
    queryset = Shoe.objects.all().distinct()
    serializer_class = ShoeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ShoeFilter

class ManufacturerViewSet(viewsets.ModelViewSet):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer

class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
