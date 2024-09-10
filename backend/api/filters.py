from django_filters import rest_framework as filters
from .models import Shoe

class ShoeFilter(filters.FilterSet):
    price_min = filters.NumberFilter(field_name='price', lookup_expr='gte')
    price_max = filters.NumberFilter(field_name='price', lookup_expr='lte')
    colors = filters.CharFilter(method='filter_colors')
    gender = filters.CharFilter(method='filter_gender')
    shoe_high = filters.CharFilter(method='filter_shoe_high')
    collection = filters.CharFilter(method='filter_collection')

    class Meta:
        model = Shoe
        fields = ['price_min', 'price_max', 'colors', 'gender', 'category', 'shoe_high', 'collection']

    def filter_colors(self, queryset, name, value):
        color_list = value.split(',')
        return queryset.filter(colors__name__in=color_list)
    
    def filter_gender(self, queryset, name, value):
        gender_list = value.split(',')
        return queryset.filter(gender__in=gender_list)
    
    def filter_shoe_high(self, queryset, name, value):
        shoe_high_list = value.split(',')
        return queryset.filter(shoe_high__in=shoe_high_list)
    
    def filter_collection(self, queryset, name, value):
        collection_list = value.split(',')
        return queryset.filter(collection__in=collection_list)