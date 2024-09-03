from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Shoe)
admin.site.register(Manufacturer)
admin.site.register(Color)
admin.site.register(Category)
admin.site.register(Collection)