from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import MainCategory, SubCategory, Brand, Product, Banner, ProductDetail
from sevenshadesapp.serializer import MainCategorySerializer, SubCategoryGetSerializer, BrandGetSerializer, ProductGetSerializer, BannerSerializer, ProductDetailGetSerializer
from rest_framework.decorators import api_view
# Create your views here.

@api_view(['GET','POST','DELETE'])
def User_MainCategory_List(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='GET':
            maincategory_list=MainCategory.objects.all() # data comes in maincategory_list (without fields names) but it is not combined (matched) with field names or not in the form of dictionary
            maincategory_serializer_list=MainCategorySerializer(maincategory_list,many=True) # data(records) in maincategory_list are mapped with fields of database/models & comes/returns in the form of dict
            #'maincategory_serializer_list' is a list of dicts
            return JsonResponse({"data":maincategory_serializer_list.data,"status":True},safe=False)

        else:
            return JsonResponse({"data":['Fail To Load Main Category Data'],"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"data":['Error While loading Main Category Data'],"status":False},safe=False)
    
@api_view(['GET','POST','DELETE'])
def User_subcategory_list_by_maincategoryid(request):
 try:
    if request.method=='POST':
        maincategoryid=request.data['maincategoryid']
        subcategory_list=SubCategory.objects.all().filter(maincategoryid_id=maincategoryid)
        subcategory_serializer_list=SubCategoryGetSerializer(subcategory_list,many=True)
        return JsonResponse({"data":subcategory_serializer_list.data,"status":True},safe=False)
    else:
            return JsonResponse({"data":['Fail To Load Sub Category Data'],"status":False},safe=False)
 except Exception as e:
    print ("Error submit:",e)
    return JsonResponse({"data":['Error While loading Sub Category Data'],"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def User_Product_List(request):
 try:
    if request.method=='POST':
        sid=request.data['subcategoryid']
        mid=request.data['maincategoryid']
        product_list=Product.objects.all().filter(subcategoryid_id=sid, maincategoryid_id=mid)
        product_serializer_list=ProductGetSerializer(product_list,many=True)
        return JsonResponse({"data":product_serializer_list.data,"status":True},safe=False)
    else:
            return JsonResponse({"data":['Fail To Load Product Data'],"status":False},safe=False)
 except Exception as e:
    print ("Error submit:",e)
    return JsonResponse({"data":['Error While loading Product Data'],"status":False},safe=False)


@api_view(['GET','POST','DELETE'])
def User_Brand_List_By_mid_sid(request):
    try:
        if request.method=='POST':
            sid=request.data['subcategoryid']
            mid=request.data['maincategoryid']
            product_list=Product.objects.all().filter(subcategoryid_id=sid, maincategoryid_id=mid)
            product_serializer_list=ProductGetSerializer(product_list,many=True)
            #print("xxxxxxx",product_serializer_list.data)
            finalresult=fetchData('brandids',product_serializer_list.data)
            return JsonResponse({"data":finalresult,"status":True},safe=False)

        else:
            return JsonResponse({"data":['Fail To Load Brands Data'],"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"data":['Error While loading Brands Data'],"status":False},safe=False)

def fetchData(field,data):
    result={}
    for row in data:
        brands=row[field]
        #print(brands)
        for brand in brands:
            brand=dict(brand)
            result[brand['id']]=brand
    #check-for loop        
    '''for b in result.values():
        print(b['brandname'])'''
    #print(result)
    return list(result.values())     
      
            

@api_view(['GET','POST','DELETE'])
def User_Banner_List(request):
    
    try:
        if request.method=='GET':
            banner_list=Banner.objects.all() # data comes in brand_list but it is not combined (matched) with field names
            banner_serializer_list=BannerSerializer(banner_list,many=True) # data(record) mapped with fields & comes in the 
            # form of dict 
            return JsonResponse({"data":banner_serializer_list.data[0],"status":True},safe=False)

        else:
            return JsonResponse({"data":['Fail To Load Banner Data'],"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"data":['Error While loading Banner Data'],"status":False},safe=False)
    
@api_view(['GET','POST','DELETE'])
def User_All_Brand_List(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='GET':
            brand_list=Brand.objects.all() 
            brand_serializer_list=BrandGetSerializer(brand_list,many=True)
            return JsonResponse({"data":brand_serializer_list.data,"status":True},safe=False)
        
        else:
            return JsonResponse({"data":['Fail To Load All Brand Data'],"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"data":['Error While loading All Brand Data'],"status":False},safe=False)
    
@api_view(['GET','POST','DELETE'])
def User_Products_Maincategory(request):
 try:
    if request.method=='POST':
        maincategoryid=request.data['maincategoryid']
        product_list=Product.objects.all().filter(maincategoryid_id=maincategoryid)
        product_serializer_list=ProductGetSerializer(product_list,many=True)
        return JsonResponse({"data":product_serializer_list.data,"status":True},safe=False)
    else:
            print("False")
            return JsonResponse({"data":['Fail To Load Product Data'],"status":False},safe=False)
 except Exception as e:
    print ("Error submit:",e)
    return JsonResponse({"data":['Error While loading Product Data'],"status":False},safe=False)
   
@api_view(['GET','POST','DELETE'])
def User_ProductsDetails_By_Id(request):
 try:
    if request.method=='POST':
         
        productid=request.data['productid']
        
        productdetail_list=ProductDetail.objects.all().filter(productid_id=productid)
        productdetail_serializer_list=ProductDetailGetSerializer(productdetail_list,many=True)
        
        return JsonResponse({"data":productdetail_serializer_list.data,"status":True},safe=False)
    else:
            print("False")
            return JsonResponse({"data":[],"status":False},safe=False)
 except Exception as e:
    print ("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)
   
