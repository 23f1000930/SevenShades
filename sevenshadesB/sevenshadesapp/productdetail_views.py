from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import Product,ProductDetail,MainCategory,SubCategory
from sevenshadesapp.serializer import ProductGetSerializer,ProductDetailSerializer,ProductDetailGetSerializer,MainCategorySerializer,SubCategoryGetSerializer
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage # it gives project address

# Create your views here.

def Upload_Files(files):
    iconname=[]
    #print("iiiiii",files.getlist('icon'))
    for uploaded_file in files.getlist('icon'):  #'icon' is from react
        file_path = default_storage.save('static/' + uploaded_file.name, uploaded_file)
        # above line of code saves image data ('uploaded_file') by this name "'static/' + uploaded_file.name"
        print(file_path)
        iconname.append(uploaded_file.name)
    return ",".join(iconname)    #convert 'iconname' array into string


@api_view(['GET','POST','DELETE'])
def ProductDetail_Submit(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            #print("FILEES", dict(request.FILES))
            
            filenames = Upload_Files(request.FILES)
            request.data['icon'] = filenames   #'icon' field from model 'ProductDetail'
            #print(request.data)

            productdetail_serializer=ProductDetailSerializer(data=request.data) #input data by user via 'react' is set to 'data' 
        #for debugging --->>print(request.data)    
        if(productdetail_serializer.is_valid()):  #checking data entered is valid or not
            productdetail_serializer.save()       #then data is saved
            return JsonResponse({"message":'Product Detail Submitted Successfully',"status":True},safe=False)
        else:
            return JsonResponse({"message":'Fail To Submit Product Detail',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To Submit',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def ProductDetail_List(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='GET':
            productdetail_list=ProductDetail.objects.all() 
            productdetail_serializer_list=ProductDetailGetSerializer(productdetail_list,many=True)
            return JsonResponse({"data":productdetail_serializer_list.data,"status":True},safe=False)

        else:
            return JsonResponse({"data":[],"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"data":[],"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def EditProductDetail_Icon(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            productdetail_data=ProductDetail.objects.get(pk=request.data['id'])
            productdetail_data.icon=request.data['icon'] #new icon is set/updated to 'icon' field of database
            productdetail_data.save()
            return JsonResponse({"message":'Product Detail Icon Upated Successfully',"status":True},safe=False) 
        else:
            return JsonResponse({"message":'Fail To update icon',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To update product detail Icon',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def EditProductDetail_Data(request):    
    try:
        if request.method=='POST':
            productdetail_data=ProductDetail.objects.get(pk=request.data['id']) 
            productdetail_data.maincategoryid_id=request.data['maincategoryid']
            productdetail_data.subcategoryid_id=request.data['subcategoryid']
            productdetail_data.brandid_id=request.data['brandid']
            productdetail_data.productid_id=request.data['productid']

            productdetail_data.productsubname=request.data['productsubname']
            productdetail_data.productsubdescription=request.data['productsubdescription']

            productdetail_data.qty=request.data['qty']
            productdetail_data.price=request.data['price']
            productdetail_data.color=request.data['color']
            productdetail_data.size=request.data['size']

            productdetail_data.offerprice=request.data['offerprice']
            productdetail_data.offertype=request.data['offertype']

            productdetail_data.save()
            return JsonResponse({"message":'Product Detail Data Upated Successfully',"status":True},safe=False)
        else:
            return JsonResponse({"message":'Fail To update Data',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To update Product Detail Data',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def DeleteProductDetail_Data(request):
    
    try:
        if request.method=='POST':
            productdetail_data=ProductDetail.objects.get(pk=request.data['id'])
            productdetail_data.delete()
            return JsonResponse({"message":'Product Detail Deleted Successfully',"status":True},safe=False)
        else:
            return JsonResponse({"message":'Fail To delete Data',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To delete Product Detail Data',"status":False},safe=False) 

#For Getting Product DD 
@api_view(['GET','POST','DELETE'])
def productdetail_product_list_by_subcategoryid(request):
 try:
    if request.method=='POST':
        subcategoryid=request.data['subcategoryid']
        productdetail_product_list=Product.objects.all().filter(subcategoryid_id=subcategoryid)
        productdetail_product_list_Serializer=ProductGetSerializer( productdetail_product_list,many=True)
        return JsonResponse({"data":productdetail_product_list_Serializer.data,"status":True},safe=False)
    else:
            return JsonResponse({"data":[],"status":False},safe=False)
 except Exception as e:
    print ("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)
 
#For Getting Brand DD 
@api_view(['GET','POST','DELETE'])
def productdetail_brand_list_by_productid(request):
 try:
    if request.method=='POST':
        productid=request.data['productid']
        productdetail_brand_list=Product.objects.all().filter(id=productid)
        productdetail_brand_list_Serializer=ProductGetSerializer( productdetail_brand_list,many=True)
        print(productdetail_brand_list_Serializer.data)
        return JsonResponse({"data":productdetail_brand_list_Serializer.data,"status":True},safe=False)
    else:
            return JsonResponse({"data":[],"status":False},safe=False)
 except Exception as e:
    print ("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)        