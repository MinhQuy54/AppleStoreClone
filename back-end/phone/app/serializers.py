from .models import *
from rest_framework import serializers
from django.contrib.auth.hashers import check_password

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CatogorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        try:
            username = User.objects.get(username=data['username'])
        except User.DoesNotExist:
            raise serializers.ValidationError("Sai tài khoản")
        
        if not check_password(data['password'], username.password):
            raise serializers.ValidationError("Sai mật khẩu")

        return username
