from rest_framework import generics
from django.contrib.auth.models import User
from .models import *
from .serializers import UserSerializer, UserDetailsSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class UserDetailsList(generics.ListAPIView):
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserDetails.objects.filter(user=self.request.user)