from django.urls import path
from .views import ProductList,CategoryList,ProductDetail,ProductNameList,LoginView
urlpatterns = [
    path('product', ProductList.as_view()),
    path('productname/',ProductNameList.as_view()),
    path('product/<int:pk>',ProductDetail.as_view()),
    path('category',CategoryList.as_view()),
     path('auth/login/', LoginView.as_view()),
]
