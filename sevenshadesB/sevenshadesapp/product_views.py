import os
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import Product,SubCategory, Brand
from sevenshadesapp.serializer import SubCategoryGetSerializer,ProductSerializer,ProductGetSerializer, BrandGetSerializer
from rest_framework.decorators import api_view
# Create your views here.
@api_view(['GET','POST','DELETE'])
def Product_Submit(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            product_serializer=ProductSerializer(data=request.data) #input data by user via 'react' is set to 'data' 

        if(product_serializer.is_valid()):  #checking data entered is valid or not
           product_serializer.save()       #then data is saved
           return JsonResponse({"message":'Product Submitted Successfully',"status":True},safe=False) 
        else:
            return JsonResponse({"message":'Fail To Submit',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To Submit Product',"status":False},safe=False)
    
@api_view(['GET','POST','DELETE'])
def Product_List(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='GET':
            product_list=Product.objects.all() # data comes in subcategory_list but it is not combined (matched) with field names
            product_serializer_list=ProductGetSerializer(product_list,many=True) #data(record) mapped with fields & comes in the form of dict   
            return JsonResponse({"data":product_serializer_list.data,"status":True},safe=False)

        else:
            return JsonResponse({"data":[],"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"data":[],"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def EditProduct_Icon(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            product_data=Product.objects.get(pk=request.data['id'])
            ready_to_delete_icon = product_data.icon.path
            product_data.icon=request.data['icon'] #new icon is set/updated to 'icon' field of database
            product_data.save()

            # Remove the old icon file
            if os.path.exists(ready_to_delete_icon):
                os.remove(ready_to_delete_icon)

            return JsonResponse({"message":'Product Icon Upated Successfully',"status":True},safe=False) 
        else:
            return JsonResponse({"message":'Fail To update icon',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To update product Icon',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def EditProduct_Data(request):    
    try:
        if request.method=='POST':
            product_data=Product.objects.get(pk=request.data['id']) 
            product_data.maincategoryid_id=request.data['maincategoryid']
            product_data.subcategoryid_id=request.data['subcategoryid']
            product_data.brandids.set(request.data['brandids'])
            product_data.productname=request.data['productname']
            product_data.productdescription=request.data['productdescription']
            product_data.save()
            return JsonResponse({"message":'Product Data Upated Successfully',"status":True},safe=False)
        else:
            return JsonResponse({"message":'Fail To update Data',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To update Product Data',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def DeleteProduct_Data(request):
    
    try:
        if request.method=='POST':
            product_data=Product.objects.get(pk=request.data['id'])
            ready_to_delete_icon = product_data.icon.path
            product_data.delete()

            # Remove the old icon file
            if os.path.exists(ready_to_delete_icon):
                os.remove(ready_to_delete_icon)
                
            return JsonResponse({"message":'Product Deleted Successfully',"status":True},safe=False)
        else:
            return JsonResponse({"message":'Fail To delete Data',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To delete Product Data',"status":False},safe=False)              

@api_view(['GET','POST','DELETE'])
def subcategory_list_by_maincategoryid(request):
 try:
    if request.method=='POST':
        maincategoryid=request.data['maincategoryid']
        subcategory_list=SubCategory.objects.all().filter(maincategoryid_id=maincategoryid)
        subcategory_serializer_list=SubCategoryGetSerializer(subcategory_list,many=True)
        return JsonResponse({"data":subcategory_serializer_list.data,"status":True},safe=False)
    else:
            return JsonResponse({"data":[],"status":False},safe=False)
 except Exception as e:
    print ("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)
       
@api_view(['GET','POST','DELETE'])
def brand_list_by_maincategoryid(request):
 try:
    if request.method=='POST':
        maincategoryid=request.data['maincategories']
        brand_list=Brand.objects.all().filter(maincategories=maincategoryid).order_by('id')
        brand_serializer_list=BrandGetSerializer(brand_list,many=True)
        return JsonResponse({"data":brand_serializer_list.data, "status":True},safe=False)
    else:
            return JsonResponse({"data":[],"status":False},safe=False)
 except Exception as e:
    print ("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)
              