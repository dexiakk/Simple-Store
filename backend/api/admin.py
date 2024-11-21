from django.contrib import admin
from .models import *

admin.site.register(UserDetails)
admin.site.register(Address)
admin.site.register(ShoeColors)
admin.site.register(Manufacturers)
admin.site.register(ShoeSizes)
admin.site.register(ShoeCategories)
admin.site.register(ShoeCollections)
admin.site.register(Shoe)
admin.site.register(ShoeImageGallery)
admin.site.register(ShoeVariant)
admin.site.register(Cart)