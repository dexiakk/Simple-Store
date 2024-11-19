from django.urls import path
from . import views

urlpatterns = [
    path("userdetails/", views.UserDetailsList.as_view(), name="userdetails"),
    path("userdetails/update/", views.UserDetailsPartialUpdateView.as_view(), name="userdetails-partial-update"),
    path("useraddresses/", views.AddressListCreate.as_view(), name="user-address"),
    path("useraddress/update/<int:id>/", views.AddressPartialUpdateView.as_view(), name="user-address-update"),
    path("useraddresses/delete/<int:id>/", views.AddressDeleteView.as_view(), name="user-address-delete"),
    path("shoelist/", views.ShoeList.as_view(), name="shoes-list"),
    path('shoe-filters/', views.ShoeFiltersView.as_view(), name='shoe-filters'),
]