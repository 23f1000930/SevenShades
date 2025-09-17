import os
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import MainCategory
from sevenshadesapp.serializer import MainCategorySerializer
from rest_framework.decorators import api_view
# Create your views here.
@api_view(['GET','POST','DELETE'])
def MainCategory_Submit(request):  # This API is called by "axios", result is returned by "axios"
    #"request" contains data which is entered via form of react
    try:
        if request.method=='POST':
            maincategory_serializer=MainCategorySerializer(data=request.data) #input data by user via 'react' is set to 'data' 
            #serializer maps the data fields of "request.data" to the data fields of model & then sent this data to model to save data in database
            #serializer communicates to model & if data is valid then this data is saved to database
        if(maincategory_serializer.is_valid()):  #checking data entered is valid or not
            maincategory_serializer.save()       #then data is saved
            return JsonResponse({"message":'Main Category Submitted Successfully',"status":True},safe=False) # safe=False means safety removed, no restrictions
           #then above response is send to 'FetchDjangoApiService.js' in 'result' of 'sevenshadesfrontend'  then this data is send to result of 
        #'Category.js'
        else:
            return JsonResponse({"message":'Fail To Submit Main Category',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Error While Submitting Main Category',"status":False},safe=False)
    
@api_view(['GET','POST','DELETE'])
def MainCategory_List(request):  # This API is called by "axios", result is returned by "axios"
    
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
def EditMainCategory_Icon(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            maincategory_data=MainCategory.objects.get(pk=request.data['id']) #by this we reach to a particular id or record that we have to modify
            #maincategory_data contains data of a particular row or record with specific id which is send through 'react'
            ready_to_delete_icon = maincategory_data.icon.path 
            maincategory_data.icon=request.data['icon'] #new icon is set/updated to 'icon' field of database
            maincategory_data.save()

            # Remove the old icon file
            if os.path.exists(ready_to_delete_icon):
                os.remove(ready_to_delete_icon)

            return JsonResponse({"message":'Main Category Icon Upated Successfully',"status":True},safe=False) # safe=False means safety removed, no restrictions
            #then above response is send to 'FetchDjangoApiService.js' in 'result' of 'sevenshadesfrontend'  then this data is send to result of 'Category.js'
        else:
            return JsonResponse({"message":'Fail To Update Main Category Icon',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Error While Updating Main Category Icon',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def EditMainCategory_Data(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            maincategory_data=MainCategory.objects.get(pk=request.data['id']) #by this we reach to a particular id or record that we have to modify
            #maincategory_data contains data of a particular row or record 
            maincategory_data.maincategoryname=request.data['maincategoryname'] #new maincategoryname is set/updated to 'icon' field of database
            maincategory_data.save()
            return JsonResponse({"message":'Main Category Name Updated Successfully',"status":True},safe=False) # safe=False means safety removed, no restrictions
            #then above response is send to 'FetchDjangoApiService.js' in 'result' of 'sevenshadesfrontend'  then this data is send to result of 'Category.js'
        else:
            return JsonResponse({"message":'Fail To Update Main Category Name',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Error While Updating Main Category Name',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def DeleteMainCategory_Data(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            maincategory_data=MainCategory.objects.get(pk=request.data['id']) #by this we reach to a particular id or record that we have to modify
            #maincategory_data contains data of a particular row or record 
            ready_to_delete_icon = maincategory_data.icon.path 
            maincategory_data.delete()

            # Remove the old icon file
            if os.path.exists(ready_to_delete_icon):
                os.remove(ready_to_delete_icon)
                
            return JsonResponse({"message":'Main Category Deleted Successfully',"status":True},safe=False) # safe=False means safety removed, no restrictions
            #then above response is send to 'FetchDjangoApiService.js' in 'result' of 'sevenshadesfrontend'  then this data is send to result of 'Category.js'
        else:
            return JsonResponse({"message":'Fail To Delete Main Category',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Error While Deleting Main Category',"status":False},safe=False)          