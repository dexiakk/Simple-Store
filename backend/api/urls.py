from django.urls import path
from . import views

urlpatterns = [
    path("userdetails/", views.UserDetailsList.as_view(), name="userdetails"),
]