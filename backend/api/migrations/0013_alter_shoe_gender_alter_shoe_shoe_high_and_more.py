# Generated by Django 5.1.3 on 2024-11-21 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_shoe_gender_alter_shoe_shoe_high_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shoe',
            name='gender',
            field=models.CharField(choices=[('male', 'Męskie'), ('female', 'Damskie'), ('unisex', 'Uniseks')], max_length=50),
        ),
        migrations.AlterField(
            model_name='shoe',
            name='shoe_high',
            field=models.CharField(choices=[('low', 'Low Top'), ('mid', 'Mid Top'), ('high', 'High Top')], max_length=50),
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='preferedGender',
            field=models.CharField(choices=[('male', 'Męskie'), ('female', 'Damskie'), ('unisex', 'Uniseks')], max_length=50),
        ),
    ]
