from django.shortcuts import render
from .models import *
from .serializers import ProductSerializer,CatogorySerializer
from django.http import Http404
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.


class ProductList(APIView):
   def get(self, request):
    products = Product.objects.all()
    new = request.query_params.get('new')
    if new and new.lower() == 'true':
        products = products.order_by('-created_at')[:4]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
   
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
    
# class ProductNewList(APIView):
#     def get(self,request):
#         productnew = Product.objects.order_by('-created_at')[:5]
#         serializer = ProductSerializer(productnew, many=True)
#         return Response(serializer.data)
    
class CategoryList(APIView):
    def get(self, request):
        keyword = request.GET.get('type')
        queryset = Category.objects.all()

        if keyword:
            queryset = queryset.filter(categoryname__icontains=keyword)

        serializer = CatogorySerializer(queryset,many=True)
        return Response(serializer.data)