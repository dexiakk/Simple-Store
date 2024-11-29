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
    path('shoe-sizes-list/', views.ShoeSizesList.as_view(), name="shoe-sizes-list"),
    path('user-cart/', views.CartList.as_view(), name="user-cart"),
    path('user-cart/update/', views.CartPartialUpdate.as_view(), name="user-cart-update"),
    path('order-create/', views.OrderCreate.as_view(), name="create-order"),
    path('orders-list/', views.OrdersList.as_view(), name="orders-list"),
    path('orders-update/<int:id>/', views.OrdersPartialUpdate.as_view(), name="orders-update"),
    path('questions-create/', views.UserQuestionCreate.as_view(), name="create-user-question"),
    path('questions-list/', views.UsersQuestionsList.as_view(), name="users-questions-list"),
    path('questions-update/<int:id>/', views.QuestionsPartialUpdate.as_view(), name="questions-update"),
]