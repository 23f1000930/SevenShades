import os
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import Brand
from sevenshadesapp.serializer import BrandSerializer,BrandGetSerializer
from rest_framework.decorators import api_view
# Create your views here.
@api_view(['GET','POST','DELETE'])
def Brand_Submit(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            brand_serializer=BrandSerializer(data=request.data) #input data by user via 'react' is set to 'data' 

        if(brand_serializer.is_valid()):  #checking data entered is valid or not
            brand_serializer.save()       #then data is saved
            return JsonResponse({"message":'Brand Submitted Successfully',"status":True},safe=False) # safe=False means safety removed, no restrictions
           #then above response is send to 'FetchDjangoApiService.js' in 'result' of 'sevenshadesfrontend'  then this data is send to result of 
        #'Brand.js'
        else:
            return JsonResponse({"message":'Fail To Submit',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To Submit Brand',"status":False},safe=False)
    
@api_view(['GET','POST','DELETE'])
def Brand_List(request):
    
    try:
        if request.method=='GET':
            brand_list=Brand.objects.all() # data comes in brand_list but it is not combined (matched) with field names
            brand_serializer_list=BrandGetSerializer(brand_list,many=True) # data(record) mapped with fields & comes in the 
           
            # form of dict 
            return JsonResponse({"data":brand_serializer_list.data,"status":True},safe=False)

        else:
            return JsonResponse({"data":[],"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"data":[],"status":False},safe=False)
    
@api_view(['GET','POST','DELETE'])
def EditBrand_Icon(request):
    
    try:
        if request.method=='POST':
            brand_data=Brand.objects.get(pk=request.data['id']) #by this we reach to a particular id or record that we have to modify
#brand_data contains data of a particular row or record 
            ready_to_delete_icon = brand_data.icon.path
            brand_data.icon=request.data['icon'] #new icon is set/updated to 'icon' field of database
            brand_data.save()

            # Remove the old icon file
            if os.path.exists(ready_to_delete_icon):
                os.remove(ready_to_delete_icon)
                
            return JsonResponse({"message":'Brand Icon Upated Successfully',"status":True},safe=False) 
        else:
            return JsonResponse({"message":'Fail To update icon',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To update Brand Icon',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def EditBrand_Data(request):
    
    try:
        if request.method=='POST':
            brand_data=Brand.objects.get(pk=request.data['id'])
            brand_data.brandname=request.data['brandname'] #new brandname is set/updated to 'brandname' field of database
            brand_data.maincategories.set(request.data['maincategories'])
            brand_data.save()
            return JsonResponse({"message":'Brand Data Upated Successfully',"status":True},safe=False) 
        else:
            return JsonResponse({"message":'Fail To update Data',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To update Brand Data',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def DeleteBrand_Data(request):
    
    try:
        if request.method=='POST':
            brand_data=Brand.objects.get(pk=request.data['id']) 
            ready_to_delete_icon = brand_data.icon.path
            brand_data.delete()

            # Remove the old icon file
            if os.path.exists(ready_to_delete_icon):
                os.remove(ready_to_delete_icon)
                
            return JsonResponse({"message":'Brand Deleted Successfully',"status":True},safe=False) 
        else:
            return JsonResponse({"message":'Fail To delete Data',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To delete Brand Data',"status":False},safe=False)          