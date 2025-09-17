from rest_framework import serializers #this is class 
from sevenshadesapp.models import MainCategory,SubCategory,Brand,Product,ProductDetail,Banner,AdminLogin
#serializer acts like a pipe which takes data through frontend & save it in backend

#MainCategorySerializer
class MainCategorySerializer(serializers.ModelSerializer):
 
    class Meta:
        model = MainCategory
        fields = '__all__'  # or ('id','maincategoryname','icon'), ['id', 'maincategoryname', 'icon']

#SubCategorySerializer
class SubCategorySerializer(serializers.ModelSerializer):
 
    class Meta:
        model = SubCategory
        fields = '__all__'

#SubCategoryGetSerializer
class SubCategoryGetSerializer(serializers.ModelSerializer):
    maincategoryid=MainCategorySerializer(many=False) # this will link all data of MainCategorySerializer to maincategoryid
# SubCategoryGetSerializer gives all the details of MainCategory & SubCategory in display the program 
    class Meta:
        model = SubCategory
        fields = '__all__'

#BrandSerializer
class BrandSerializer(serializers.ModelSerializer):

    #maincategories = serializers.PrimaryKeyRelatedField(queryset=MainCategory.objects.all(), many=True) 
    class Meta:
        model = Brand
        fields = '__all__'


#BrandGetSerializer
class BrandGetSerializer(serializers.ModelSerializer):
    maincategories=MainCategorySerializer(many=True)
    class Meta:
        model = Brand
        fields = '__all__'


#ProductSerializer
class ProductSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Product
        fields = '__all__'

#ProductGetSerializer
class ProductGetSerializer(serializers.ModelSerializer):
    maincategoryid=MainCategorySerializer(many=False)
    subcategoryid=SubCategorySerializer(many=False)
    brandids=BrandSerializer(many=True)
    class Meta:
        model = Product
        fields = '__all__'   

#ProductDetail
class ProductDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductDetail
        fields = '__all__'

#ProductDetailGetSerializer
class ProductDetailGetSerializer(serializers.ModelSerializer):
    maincategoryid=MainCategorySerializer(many=False)
    subcategoryid=SubCategorySerializer(many=False)
    brandid=BrandSerializer(many=False)
    productid=ProductSerializer(many=False) 
    class Meta:
        model = ProductDetail
        fields = '__all__'           

#BannerSerializer
class BannerSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Banner
        fields = '__all__'

#AdminLoginSerializer
class AdminLoginSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = AdminLogin
        fields = '__all__'