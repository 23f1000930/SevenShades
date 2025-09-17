from django.db import models

# Create your models here.
# for insert, update, delete & display  operations in database we have to make serializer
# database tak info. bheajne ki responsibility serializer ki hoti he
# model represent our table 
# model communicates with our database

#MainCategory
class MainCategory(models.Model):
    maincategoryname = models.CharField(max_length=70, blank=False, default='')
    icon = models.ImageField(upload_to='static/')

#SubCategory
class SubCategory(models.Model):
    maincategoryid = models.ForeignKey(MainCategory, on_delete=models.CASCADE)
    subcategoryname = models.CharField(max_length=70, blank=False, default='')
    icon = models.ImageField(upload_to='static/')

#Brand
class Brand(models.Model):
    maincategories = models.ManyToManyField(MainCategory) 
    brandname = models.CharField(max_length=70, blank=False, default='')
    icon = models.ImageField(upload_to='static/')

#Product
class Product(models.Model):
    maincategoryid = models.ForeignKey(MainCategory, on_delete=models.CASCADE)
    subcategoryid = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    brandids = models.ManyToManyField(Brand) 
    productname = models.CharField(max_length=70, blank=False, default='')
    productdescription = models.CharField(max_length=500, blank=False, default='')
    icon = models.ImageField(upload_to='static/')    

#ProductDetail
class ProductDetail(models.Model):
    maincategoryid = models.ForeignKey(MainCategory, on_delete=models.CASCADE)
    subcategoryid = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    brandid = models.ForeignKey(Brand, on_delete=models.CASCADE)
    productid = models.ForeignKey(Product, on_delete=models.CASCADE)
    productsubname = models.CharField(max_length=70, blank=False, default='')
    productsubdescription = models.CharField(max_length=500, blank=False, default='')
    qty = models.IntegerField(blank=False, default='')
    price = models.IntegerField(blank=False, default='')
    color = models.CharField(max_length=70, blank=False, default='')
    size = models.CharField(max_length=70, blank=False, default='')
    offerprice = models.IntegerField(blank=False, default='')
    offertype = models.CharField(max_length=100, blank=False, default='')
    pub_date = models.DateField(auto_now_add=True)
    icon = models.TextField(default='') #it contains array of URLs of images that comes from react

#Banner
class Banner(models.Model):
    bannerdescription = models.CharField(max_length=500, blank=False, default='')
    pictures = models.TextField(default='')  #it contains array of URLs of images from react

#AdminLogin
class AdminLogin(models.Model):
    emailid = models.CharField(max_length=70, blank=False, default='', unique=True)
    mobileno = models.CharField(max_length=70, blank=False, default='', unique=True)
    adminname = models.CharField(max_length=70, blank=False, default='',)
    password = models.CharField(max_length=70, blank=False, default='',)
    picture = models.CharField(max_length=70, blank=False, default='', )