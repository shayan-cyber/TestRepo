from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from . serializers import (
    UserSerializer,
    StudentDetailSerializer
)

from . models import (
    StudentDetail
)

# Create your views here.

@api_view(['GET'])
def home(request):
    return Response({"message": "Hello World"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def student_details(request):
    
    details = StudentDetail.objects.all().order_by('-attendance')
    serializer = StudentDetailSerializer(details, many=True)
    return Response(serializer.data , status=status.HTTP_200_OK )

@api_view(['POST'])
def add_student_details(request):
    data = request.data
    print(data)
    serializer = StudentDetailSerializer(data= data)
    if serializer.is_valid():
        serializer.save()
        return Response({"serializer_data":serializer.data}, status = status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    


@api_view(['POST'])
def register(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
       
        user_obj = get_object_or_404(User, id = serializer.data['id'])
        token = get_object_or_404(Token, user = user_obj)

        return Response({"serializer-data":serializer.data, "token":token.key, "username":user_obj.username}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)