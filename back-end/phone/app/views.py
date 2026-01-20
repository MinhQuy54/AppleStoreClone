from django.shortcuts import render
from .models import *
from .serializers import ProductSerializer,CatogorySerializer
from django.http import Http404
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class ProductList(APIView):
    def get(self,request):
        product = Product.objects.all()
        serializers = ProductSerializer(product,many=True)
        return Response(serializers.data)
class ProductDetail(APIView):
    def get_obj(self,pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404()
    def get(self,request,pk):
        product = self.get_obj(pk)
        serializers = ProductSerializer(product)
        return Response(serializers.data)
    
class CategoryList(APIView):
    def get(self, request):
        keyword = request.GET.get('type')
        queryset = Category.objects.all()

        if keyword:
            queryset = queryset.filter(categoryname__icontains=keyword)

        serializer = CatogorySerializer(queryset,many=True)
        return Response(serializer.data)