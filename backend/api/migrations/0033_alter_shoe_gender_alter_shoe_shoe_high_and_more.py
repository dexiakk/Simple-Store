# Generated by Django 5.1.3 on 2024-12-01 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_shoe_on_sale_shoe_sale_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shoe',
            name='gender',
            field=models.CharField(choices=[('female', 'Damskie'), ('unisex', 'Uniseks'), ('male', 'Męskie')], max_length=50),
        ),
        migrations.AlterField(
            model_name='shoe',
            name='shoe_high',
            field=models.CharField(choices=[('high', 'High Top'), ('mid', 'Mid Top'), ('low', 'Low Top')], max_length=50),
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='preferedGender',
            field=models.CharField(choices=[('female', 'Damskie'), ('unisex', 'Uniseks'), ('male', 'Męskie')], max_length=50),
        ),
    ]
