from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import Banner
from sevenshadesapp.serializer import BannerSerializer
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage


# Create your views here.

def Upload_Files(files):
    picturename=[]
    for uploaded_file in files.getlist('pictures'):  #'icon' is from react
        file_path = default_storage.save('static/' + uploaded_file.name, uploaded_file)
        print(file_path)
        picturename.append(uploaded_file.name)
    return ",".join(picturename)    #convert 'picturename' array into string

@api_view(['GET','POST','DELETE'])
def Banner_Submit(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            filenames = Upload_Files(request.FILES)
            request.data['pictures'] = filenames   #'icon' is from react
            banner_serializer=BannerSerializer(data=request.data) #input data by user via 'react' is set to 'data' 

        if(banner_serializer.is_valid()):  #checking data entered is valid or not
            banner_serializer.save()       #then data is saved
            return JsonResponse({"message":'Banner Submitted Successfully',"status":True},safe=False)
        else:
            return JsonResponse({"message":'Fail To Submit Banner',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To Submit',"status":False},safe=False)
    