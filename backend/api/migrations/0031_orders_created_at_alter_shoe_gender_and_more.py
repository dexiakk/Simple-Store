# Generated by Django 5.1.3 on 2024-11-29 22:03

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_alter_orders_admin_accepted_alter_orders_shipped_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, help_text='The date and time when the order was created.'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='shoe',
            name='gender',
            field=models.CharField(choices=[('unisex', 'Uniseks'), ('male', 'Męskie'), ('female', 'Damskie')], max_length=50),
        ),
        migrations.AlterField(
            model_name='shoe',
            name='shoe_high',
            field=models.CharField(choices=[('low', 'Low Top'), ('mid', 'Mid Top'), ('high', 'High Top')], max_length=50),
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='preferedGender',
            field=models.CharField(choices=[('unisex', 'Uniseks'), ('male', 'Męskie'), ('female', 'Damskie')], max_length=50),
        ),
    ]
