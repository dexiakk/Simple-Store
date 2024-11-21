# Generated by Django 5.1.3 on 2024-11-21 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_shoe_gender_alter_shoe_shoe_high_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shoe',
            name='gender',
            field=models.CharField(choices=[('female', 'Damskie'), ('male', 'Męskie'), ('unisex', 'Uniseks')], max_length=50),
        ),
        migrations.AlterField(
            model_name='shoe',
            name='shoe_high',
            field=models.CharField(choices=[('low', 'Low Top'), ('high', 'High Top'), ('mid', 'Mid Top')], max_length=50),
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='preferedGender',
            field=models.CharField(choices=[('female', 'Damskie'), ('male', 'Męskie'), ('unisex', 'Uniseks')], max_length=50),
        ),
    ]
