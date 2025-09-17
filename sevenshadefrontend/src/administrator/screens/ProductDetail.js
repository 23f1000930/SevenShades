import {FormHelperText,FormControl,InputLabel,Select,MenuItem,Grid,TextField,Button,Avatar } from "@mui/material";
import { useEffect,useState } from "react";
import { getData } from "../../services/FetchDjangoApiService";
import {useStyles } from "./CategoryCss";
import TitleComponent from "../components/admin/TitleComponent";
import { postData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";
import listimage from "../../images/list.png"
export default function ProductDetail(props)
{
    var classes=useStyles()
    const[mainCategoryId,setMainCategoryId]=useState('')
    const[subCategoryId,setSubCategoryId]=useState('')
    const[brandId,setBrandId]=useState('')
    const[productId,setProductId]=useState('')
    const[productSubName,setProductSubName]=useState('')
    const[productSubDescription,setProductSubDescription]=useState('')

    const[qty,setQty]=useState('')
    const[price,setPrice]=useState('')
    const[color,setColor]=useState('')
    const[size,setSize]=useState('')
    const[offerPrice,setOfferPrice]=useState('')
    const[offerType,setOfferType]=useState('')

    const[icon,setIcon]=useState({file:[],bytes:[]}) //bytes is used to save Image
    const[formError,setFormError]=useState([{icon:false}])
    const[mainCategoryList,setMainCategoryList]=useState([])
    const[subCategoryList,setSubCategoryList]=useState([])
    const[brandList,setBrandList]=useState([])
    const[productList,setProductList]=useState([])
    useEffect(function(){
        fetchAllMC()

      },[])
      const fetchAllMC=async()=>{
        var result=await getData('maincategory_list') 
        setMainCategoryList(result.data)
      }

      const fillMainCategory=()=>{
        return mainCategoryList.map((item)=>{
            return <MenuItem value={item.id}>{item.maincategoryname}</MenuItem>
        })
    }

      const fetchAllSubcategory=async(mid)=>{
        var result=await postData('product_subcategory_list_by_maincategoryid',{maincategoryid:mid}) 
        setSubCategoryList(result.data)
      }
      
      const handleFetchSubcategory=(event)=>
      { setMainCategoryId(event.target.value)
        setSubCategoryId('')
        setProductId('')
        setBrandId('')
       fetchAllSubcategory(event.target.value)
      }

    const fillSubCategory=()=>{
        
        return subCategoryList.map((item)=>{
            return <MenuItem value={item.id}>{item.subcategoryname}</MenuItem>
        })
    }

    const fetchAllProduct=async(sid)=>{
        var result=await postData('productdetail_product_list_by_subcategoryid',{subcategoryid:sid}) 
        setProductList(result.data)
      }
      
      const handleFetchProduct=(event)=>
      { setSubCategoryId(event.target.value)
        setProductId('')
        setBrandId('')
        fetchAllProduct(event.target.value)
      }

    const fillProduct=()=>{
        return productList.map((item)=>{
            return <MenuItem value={item.id}>{item.productname}</MenuItem>
        })
    }

    const fetchAllBrand=async(pid)=>{
        var result=await postData('productdetail_brand_list_by_productid',{productid:pid}) 
        setBrandList(result.data)
      }
      
      const handleFetchBrand=(event)=>
      { setProductId(event.target.value)
        setBrandId('')
       fetchAllBrand(event.target.value)
      }

    const fillBrand=()=>{
        return brandList.map((item)=>{
            return item.brandids.map((brand)=>{
                return <MenuItem value={brand.id}>{brand.brandname}</MenuItem>
            })
        })
    }

    const handleChange=(event)=>{
        var files=Object.values(event.target.files)  //we take values of files/images by using Object.values
        if(files.length>=4 && files.length<=7)
        setIcon({file:files, bytes:event.target.files})
    
    else
        alert("Please input min. 4 & max 7 images...")
        handleError(false,"icon")
    }
    
    const showImages=()=>{
        return icon?.file?.map((item)=>{
            return <span><img src={URL.createObjectURL(item)} style={{width:40, height:40, borderRadius:10, marginRight:3}} /></span>
        })
    }

    const handleError=(errormessage,label)=>{  //prev means previous value of error
        setFormError((prev)=>({...prev,[label]:errormessage}))
    }

    const handleClick=async()=>{
        var err=false

        if(mainCategoryId.length==0)
        {
            handleError("Please input main category id","maincategoryid")
            err=true
        }

        if(subCategoryId.length==0)
        {
            handleError("Please input sub category id","subcategoryid")
            err=true
        }

        if(brandId.length==0)
        {
            handleError("Please input brand id","brandid")
            err=true
        }

        if(productId.length==0)
        {
            handleError("Please input product id","productid")
            err=true
        }

        if(productSubName.length==0)
        {
            handleError("Please input product","productsubname")
            err=true
        }

        if(productSubDescription.length==0)
        {
            handleError("Please input product description","productsubdescription")
            err=true
        }


        if(qty<0)
        {
            handleError("Please input proper quantity ","qty")
            err=true
        }

        if(price<0)
        {
            handleError("Please input proper price ","price")
            err=true
        }

        if(color.length==0)
        {
            handleError("Please input product color","color")
            err=true
        }

        if(size.length==0)
        {
            handleError("Please input product size","size")
            err=true
        }

        if(offerPrice<0)
        {
            handleError("Please input proper offer price ","offerprice")
            err=true
        }


        if(offerType.length==0)
        {
            handleError("Please input product offer type color","offertype")
            err=true
        }

        if(icon.bytes.length==0) // icon named image is already exist so we have to work on bytes
        {
            handleError("Please select some icon","icon")
            err=true
        }

        if(err==false)
        {
        var formData=new FormData()
        formData.append('maincategoryid',mainCategoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('brandid',brandId)
        formData.append('productid',productId)
        formData.append('productsubname',productSubName)
        formData.append('productsubdescription',productSubDescription)
        formData.append('qty',qty)
        formData.append('price',price)
        formData.append('color',color)
        formData.append('size',size)
        formData.append('offerprice',offerPrice)
        formData.append('offertype',offerType)
        icon?.file?.map((item)=>{
            formData.append('icon', item)  //formData.append('picture', item)
        }) //-------------> it becomes an array because variable is one ('icon') & value are multiple & send to backend
        var result=await postData('productdetail_submit',formData)
        if(result.status)
        {
            Swal.fire({
                title: "The Seven Shades",
                text: result.message,
                icon: "success",
                toast:true
              });
        }
        else
        {
            Swal.fire({
                title: "The Seven Shades",
                text: result.message,
                icon: "error",
                toast:true
              });
        }
      }
    }

    return(<div className={classes.root}>
    <div className={classes.product_detail_box}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TitleComponent width={180} title={'Product Detail'} listicon={listimage} link={'/admindashboard/displayproductdetail'} />
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Main Category Id</InputLabel>
                    <Select onChange={handleFetchSubcategory} onFocus={()=>handleError('','maincategoryid')} error={formError.maincategoryid} value={mainCategoryId} label={"Main Category Id"}>
                        <MenuItem value="Select Category" >Select Category</MenuItem>
                        {fillMainCategory()}
                    </Select>
                    <FormHelperText>{formError.maincategoryid}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Sub Category Id</InputLabel>
                    <Select onChange={handleFetchProduct} onFocus={()=>handleError('','subcategoryid')} error={formError.subcategoryid} value={subCategoryId} label={"Sub Category Id"} >
                        <MenuItem value="Select Category" >Select Category</MenuItem>
                        {fillSubCategory()}
                    </Select>
                    <FormHelperText>{formError.subcategoryid}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Product Id</InputLabel>
                    <Select onChange={handleFetchBrand}  onFocus={()=>handleError('','productid')} error={formError.productid} value={productId} label={"Product Id"}>
                        <MenuItem value="Select Category" >Select Category</MenuItem>
                        {fillProduct()}
                    </Select>
                    <FormHelperText>{formError.productid}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Brand Id</InputLabel>
                    <Select onFocus={()=>handleError('','brandid')} error={formError.brandid} value={brandId} label={"Brand Id"} onChange={(event)=>setBrandId(event.target.value)}>
                        <MenuItem value="Select Category" >Select Category</MenuItem>
                        {fillBrand()}
                    </Select>
                    <FormHelperText>{formError.brandid}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <TextField error={formError.productsubname} helperText={formError.productsubname} onFocus={()=>handleError(false,'productsubname')} onChange={(event)=>setProductSubName(event.target.value)} fullWidth label="Product Sub Name"/>
            </Grid> 

            <Grid item xs={12}>
                <TextField error={formError.productsubdescription} helperText={formError.productsubdescription} onFocus={()=>handleError(false,'productsubdescription')} onChange={(event)=>setProductSubDescription(event.target.value)} fullWidth label="Product Sub Description"/>
            </Grid> 

            <Grid item xs={6}>
                <TextField error={formError.qty} helperText={formError.qty} onFocus={()=>handleError(false,'qty')} onChange={(event)=>setQty(event.target.value)} fullWidth label="Quantity"/>
            </Grid> 

            <Grid item xs={6}>
                <TextField error={formError.price} helperText={formError.price} onFocus={()=>handleError(false,'price')} onChange={(event)=>setPrice(event.target.value)} fullWidth label="Price"/>
            </Grid> 

            <Grid item xs={6}>
                <TextField error={formError.color} helperText={formError.color} onFocus={()=>handleError(false,'color')} onChange={(event)=>setColor(event.target.value)} fullWidth label="Color"/>
            </Grid> 

            <Grid item xs={6}>
                <TextField error={formError.size} helperText={formError.size} onFocus={()=>handleError(false,'size')} onChange={(event)=>setSize(event.target.value)} fullWidth label="Size"/>
            </Grid> 

            <Grid item xs={6}>
                <TextField error={formError.offerprice} helperText={formError.offerprice} onFocus={()=>handleError(false,'offerprice')} onChange={(event)=>setOfferPrice(event.target.value)} fullWidth label="Offer Price"/>
            </Grid> 

            <Grid item xs={6}>
                <TextField error={formError.offertype} helperText={formError.offertype} onFocus={()=>handleError(false,'offertype')} onChange={(event)=>setOfferType(event.target.value)} fullWidth label="Offer Type"/>
            </Grid> 

            <Grid item xs={6} style={{display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Button variant="contained" component='label'>
                    Upload Icon
                    <input type="file" hidden accept="image/*" onChange={handleChange} multiple/>
                </Button>
                {formError.icon?<div style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:3,color:'#d32f2f', fontSize:'0.75rem',fontWeight:400}}>{formError.icon}</div>:<></>}
            </Grid>

            <Grid item xs={6} style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
            {showImages()}
            </Grid>

            <Grid item xs={6}>
                <Button onClick={handleClick} variant="contained" fullWidth>Submit</Button>
            </Grid>

            <Grid item xs={6}>
                <Button variant="contained" fullWidth>Reset</Button>
            </Grid>
        </Grid>
    </div>
    </div>)
}