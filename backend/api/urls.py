from django.urls import path
from . import views

urlpatterns = [
    path("userdetails/", views.UserDetailsList.as_view(), name="userdetails"),
    path("userdetails/update/", views.UserDetailsPartialUpdateView.as_view(), name="userdetails-partial-update"),
    path("useraddresses/", views.AddressListCreate.as_view(), name="user-address"),
    path("useraddress/update/<int:id>/", views.AddressPartialUpdateView.as_view(), name="user-address-update"),
    path("useraddresses/delete/<int:id>/", views.AddressDeleteView.as_view(), name="user-address-delete"),
    path("shoelist/", views.ShoeList.as_view(), name="shoes-list"),
    path("shoe-to-edit/<int:id>/", views.ShoeToEditView.as_view(), name="shoe-to-edit"),
    path('shoes/create/', views.ShoeCreateView.as_view(), name='shoe-create'),
    path('shoes/update/<int:id>/', views.ShoePartialUpdateView.as_view(), name='shoe-update'),
    path("shoe-on-sale-list/", views.ShoeListOnSaleView.as_view(), name="shoe-on-sale-list"),
    path('shoe-filters/', views.ShoeFiltersView.as_view(), name='shoe-filters'),
    path('shoe-filters-with-id/', views.ShoeFiltersWithIDsView.as_view(), name='shoe-filters-with-id'),
    path('shoe-sizes-list/', views.ShoeSizesList.as_view(), name="shoe-sizes-list"),
    path('shoe-sizes-with-id-list/', views.ShoeSizesWithIdList.as_view(), name="shoe-sizes-wth-id-list"),
    path('user-cart/', views.CartList.as_view(), name="user-cart"),
    path('user-cart/update/', views.CartPartialUpdate.as_view(), name="user-cart-update"),
    path('order-create/', views.OrderCreate.as_view(), name="create-order"),
    path('orders-list/', views.OrdersList.as_view(), name="orders-list"),
    path('orders-update/<int:id>/', views.OrdersPartialUpdate.as_view(), name="orders-update"),
    path('questions-create/', views.UserQuestionCreate.as_view(), name="create-user-question"),
    path('questions-list/', views.UsersQuestionsList.as_view(), name="users-questions-list"),
    path('questions-update/<int:id>/', views.QuestionsPartialUpdate.as_view(), name="questions-update"),
    path('image-galleries/', views.ShoeImageGalleryCreate.as_view(), name="image-galleries"),
    path('shoe-variants/', views.ShoeVariantCreateView.as_view(), name="shoe-variants"),
    path('shoe-variant-to-edit/<int:id>/', views.ShoeVariantToEditView.as_view(), name="shoe-variant-to-edit"),
    path('shoe-variant/update/<int:id>/', views.ShoeVariantPartialUpdateView.as_view(), name='shoe-variant-update'),
    path("image-gallery-to-edit/<int:id>/", views.ShoeImageGalleryToEditView.as_view(), name="image-gallery-to-edit"),
    path('image-gallery/update/<int:id>/', views.ShoeImageGalleryPartialUpdateView.as_view(), name='image-gallery-update'),
]

