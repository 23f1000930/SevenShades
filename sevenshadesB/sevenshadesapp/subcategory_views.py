import os
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import SubCategory
from sevenshadesapp.serializer import SubCategorySerializer
from sevenshadesapp.serializer import SubCategoryGetSerializer
from rest_framework.decorators import api_view
# Create your views here.
@api_view(['GET','POST','DELETE'])
def SubCategory_Submit(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            subcategory_serializer=SubCategorySerializer(data=request.data) #input data by user via 'react' is set to 'data' 

        if(subcategory_serializer.is_valid()):  #checking data entered is valid or not
            subcategory_serializer.save()       #then data is saved
            return JsonResponse({"message":'Sub Category Submitted Successfully',"status":True},safe=False) # safe=False means safety removed, no restrictions
           #then above response is send to 'FetchDjangoApiService.js' in 'result' of 'sevenshadesfrontend'  then this data is send to result of 
        #'Category.js'
        else:
            return JsonResponse({"message":'Fail To Submit Sub Category',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Error While Submitting Sub Category',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def SubCategory_List(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='GET':
            subcategory_list=SubCategory.objects.all() # data comes in subcategory_list but it is not combined (matched) with field names
            subcategory_serializer_list=SubCategoryGetSerializer(subcategory_list,many=True) 
            # 'SubCategoryGetSerializer' gives details of each subcategory along with the details of foreign key (maincategoryid)
            return JsonResponse({"data":subcategory_serializer_list.data,"status":True},safe=False)

        else:
            return JsonResponse({"data":['Fail To Load Sub Category Data'],"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"data":['Error While loading Sub Category Data'],"status":False},safe=False)    
@api_view(['GET','POST','DELETE'])
def EditSubCategory_Icon(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            subcategory_data=SubCategory.objects.get(pk=request.data['id']) #by this we reach to a particular id or record that we have to modify
#maincategory_data contains data of a particular row or record 
            ready_to_delete_icon = subcategory_data.icon.path
            subcategory_data.icon=request.data['icon'] #new icon is set/updated to 'icon' field of database
            subcategory_data.save()

            # Remove the old icon file
            if os.path.exists(ready_to_delete_icon):
                os.remove(ready_to_delete_icon)

            return JsonResponse({"message":'Sub Category Icon Upated Successfully',"status":True},safe=False) # safe=False means safety removed, no restrictions
           #then above response is send to 'FetchDjangoApiService.js' in 'result' of 'sevenshadesfrontend'  then this data is send to result of 
        #'Category.js'
        else:
            return JsonResponse({"message":'Fail To Update Sub Category Icon',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Error While Updating Sub Category Icon',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def EditSubCategory_Data(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            subcategory_data=SubCategory.objects.get(pk=request.data['id'])
            subcategory_data.maincategoryid_id=request.data['maincategoryid'] # subcategory_data.maincategoryid_id--> while updating the foregin key
            subcategory_data.subcategoryname=request.data['subcategoryname']
            subcategory_data.save()
            return JsonResponse({"message":'Sub Category Data Updated Successfully',"status":True},safe=False) # safe=False means safety removed, no restrictions
           #then above response is send to 'FetchDjangoApiService.js' in 'result' of 'sevenshadesfrontend'  then this data is send to result of 
        #'Category.js'
        else:
            return JsonResponse({"message":'Fail To Update Sub Category Data',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Error While Updating Sub Category Data',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def DeleteSubCategory_Data(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            subcategory_data=SubCategory.objects.get(pk=request.data['id']) #by this we reach to a particular id or record that we have to modify
#maincategory_data contains data of a particular row or record 
            ready_to_delete_icon = subcategory_data.icon.path
            subcategory_data.delete()

            # Remove the old icon file
            if os.path.exists(ready_to_delete_icon):
                os.remove(ready_to_delete_icon)
                
            return JsonResponse({"message":'Sub Category Deleted Successfully',"status":True},safe=False) # safe=False means safety removed, no restrictions
           #then above response is send to 'FetchDjangoApiService.js' in 'result' of 'sevenshadesfrontend'  then this data is send to result of 
        #'Category.js'
        else:
            return JsonResponse({"message":'Fail To Delete Sub Category',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Error While Deleting Sub Category',"status":False},safe=False)              