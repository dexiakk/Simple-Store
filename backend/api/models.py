from django.db import models

# Create your models here.
class Manufacturer(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Manufacturers"

class Color(models.Model):
    name = models.CharField(max_length=50)
    hex_code = models.CharField(max_length=7, help_text="Kolor w formacie HEX, np. #FFFFFF")

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Colors"

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"

class Collection(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Collections"

class Shoe(models.Model):
    GENDER_CHOICES = {
        ('male', 'Męskie'),
        ('female', 'Damskie'),
        ('unisex', 'Uniseks')
    }
    SHOE_HIGH_CHOICES = {
        ('low', 'Buty typu Low'),
        ('mid', 'Buty typu Mid'),
        ('high', 'Buty typu High')
    }

    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    model = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    colors = models.ManyToManyField(Color)
    bestseller = models.BooleanField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    gender = models.CharField(max_length=50, choices=GENDER_CHOICES)
    shoe_high = models.CharField(max_length=50, choices=SHOE_HIGH_CHOICES)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    image = models.ImageField(null=False, upload_to="images/", default="images/default_shoe.png")

    def __str__(self):
        return self.model
    
    class Meta:
        verbose_name_plural = "Shoes"


