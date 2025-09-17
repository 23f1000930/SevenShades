import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoryCss";
import TitleComponent  from "../components/admin/TitleComponent";
import { useEffect,useState } from "react";
import { getData, postData, serverURL } from "../../services/FetchDjangoApiService";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormHelperText,FormControl,InputLabel,Select,MenuItem,Button,Grid,TextField,Avatar } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayProductDetail()
{
    var classes=useStyles()
    const [open,setOpen]=useState(false)
    const [productDetailList,setProductDetailList]=useState([])
    var navigate=useNavigate()

    useEffect(function(){
        fetchAllProductDetail()

      },[])
      const fetchAllProductDetail=async()=>{
        var result=await getData('productdetail_list')
        setProductDetailList(result.data)

      }
//LIST CATEGORY****************************************************************************************************************************
    function listProduct() {
        return (
          <MaterialTable
            title={<TitleComponent width={225} title={'Product Detail List'} listicon=''/>}
            columns={[
              { title: 'Id', field: 'id' }, //title depend on field which is also a column name in MySQL database
              { title: 'Ids', render:(rowData)=>
              <div style={{display:'flex',flexDirection:'column'}}>

                <div>{rowData.maincategoryid.id}/{rowData.maincategoryid.maincategoryname}</div> 
                <div>{rowData.subcategoryid.id}/{rowData.subcategoryid.subcategoryname}</div>
                <div>{rowData.brandid.id}/{rowData.brandid.brandname}</div>
                <div>{rowData.productid.id}/{rowData.productid.productname}</div>

              </div> },

              //render fetch each record one by one  record
              { title: 'Product Sub Name', field: 'productsubname' },
              { title: 'Product Sub Description', field: 'productsubdescription' },

              { title: 'Quantity/Price', render:(rowData)=>
              <div>
                <div>{rowData.qty}/{rowData.price}</div>
              </div> },

              { title: 'Color/Size', render:(rowData)=><div>
                <div>{rowData.color}/{rowData.size}</div>
              </div> },

              { title: 'Offer Type/Offer Price', render:(rowData)=>
              <div>
                <div>{rowData.offertype}/{rowData.offerprice}</div>
              </div> },
              
              { title: 'Icon',render:(row)=><div div style={{width:110, display:'flex', flexWrap:'wrap'}}>{row?.icon?.split(',').map((item)=>{return <img src={` ${serverURL}/static/${item}`} style={{margin:2, width:30,height:30,borderRadius:5}}/>})} </div>}
              //{ title: 'Icon',render:(row)=><>{row?.icon?.split(',').map((item)=> <img src={` ${serverURL}/static/${item}`} style={{width:30,height:30,borderRadius:15}}/>)}</>}
            ]}
            data={productDetailList}  //fetch all products     
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Product',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Remove  Product',
                onClick: (event, rowData) => handleDeleteData(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Product Detail',
                isFreeAction:true,
                onClick: (event, rowData) => navigate('/admindashboard/productdetail')
              }
            ]}
          />
        )
      }
//******************************************************************************************************************************************      
//LIST CATEGORY ACTIONS*********************************************************************************************************************

    const[id,setId]=useState('')
    const[mainCategoryId,setMainCategoryId]=useState('')
    const[subCategoryId,setSubCategoryId]=useState('')
    const[brandId,setBrandId]=useState('')
    const[productId,setProductId]=useState('')
    const[productSubName,setProductSubName]=useState('')
    const[productSubDescription,setProductSubDescription]=useState('')

    const[tempIcon,setTempIcon]=useState('')
    const[btnStatus,setBtnStatus]=useState(true)

    const[qty,setQty]=useState('')
    const[price,setPrice]=useState('')
    const[color,setColor]=useState('')
    const[size,setSize]=useState('')
    const[offerPrice,setOfferPrice]=useState('')
    const[offerType,setOfferType]=useState('')

    const[icon,setIcon]=useState({file:'icon.png',bytes:''}) //bytes is used to save Image
    const[formError,setFormError]=useState([{icon:false}])
    const[mainCategoryList,setMainCategoryList]=useState([])
    const[subCategoryList,setSubCategoryList]=useState([])
    const[brandList,setBrandList]=useState([])
    const[productList,setProductList]=useState([])


    const handleOpenDialog=(rowData)=>{
    //specify database fields
    setId(rowData.id)
    setMainCategoryId(rowData.maincategoryid.id)
    setSubCategoryId(rowData.subcategoryid.id)
    setProductId(rowData.productid.id)
    setBrandId(rowData.brandid.id)
    
    setProductSubName(rowData.productsubname)
    setProductSubDescription(rowData.productsubdescription)

    setQty(rowData.qty)
    setPrice(rowData.price)
    setColor(rowData.color)
    setSize(rowData.size)
    setOfferPrice(rowData.offerprice)
    setOfferType(rowData.offertype)

    setIcon({file:`${serverURL}${rowData.icon}`,bytes:''})
    setTempIcon(`${serverURL}${rowData.icon}`)
    setOpen(true)
    fetchAllSubcategory(rowData.maincategoryid.id)
    fetchAllProduct(rowData.subcategoryid.id)
    fetchAllBrand(rowData.productid.id)
  }

    const handleDeleteData=async(rowData)=>{
    Swal.fire({
      title: "Do you want to Delete Product?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body={id:rowData.id}
        var result=await postData('deleteproductdetaildata',body)
        if(result.status)
        {
          Swal.fire("Deleted!", "", "success");
        }
        fetchAllProduct() 
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }    
//******************************************************************************************************************************************
//SHOW CATEGORY DIALOG ACTIONS**************************************************************************************************************

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
        return <MenuItem value={item.brandid.id}>{item.brandid.brandname}</MenuItem>
    })
  }

    const handleChange=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnStatus(false)
  }

    const handleError=(errormessage,label)=>{  //prev means previous value of error
    setFormError((prev)=>({...prev,[label]:errormessage}))
  }

    const handleCancel=()=>{
    setBtnStatus(true)
    setIcon({file:tempIcon,bytes:''})
  }
    const handleEditIcon=async()=>{
    var formData=new FormData()
    formData.append('id',id)
    formData.append('icon',icon.bytes)
    var result=await postData('editproductdetail_icon',formData)
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
    fetchAllProductDetail()
    setBtnStatus(true)
  }

    const handleEditData=async()=>{

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

    if(err==false)
    {
        var body={id:id,maincategoryid:mainCategoryId,subcategoryid:subCategoryId,brandid:brandId,productid:productId,productsubname:productSubName,productsubdescription:productSubDescription,qty:qty,price:price,color:color,size:size,offerprice:offerPrice,offertype:offerType}
        var result=await postData('editproductdetail_data',body)
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
  fetchAllProductDetail()
  }

  const handleClose=()=>{
    setOpen(false)
  }
    const showCategoryDialog=()=>{

    return(<Dialog open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle>
        <TitleComponent width={260} title={'Update  Product Detail'} listicon=''/>
      </DialogTitle>
      <DialogContent>
        <div style={{margin:5 }}>
            <Grid container spacing={2}>

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
                <TextField value={productSubName} error={formError.productsubname} helperText={formError.productsubname} onFocus={()=>handleError(false,'productsubname')} onChange={(event)=>setProductSubName(event.target.value)} fullWidth label="Product Sub Name"/>
            </Grid> 

            <Grid item xs={12}>
                <TextField value={productSubDescription} error={formError.productsubdescription} helperText={formError.productsubdescription} onFocus={()=>handleError(false,'productsubdescription')} onChange={(event)=>setProductSubDescription(event.target.value)} fullWidth label="Product Sub Description"/>
            </Grid> 

            <Grid item xs={6}>
                <TextField value={qty} error={formError.qty} helperText={formError.qty} onFocus={()=>handleError(false,'qty')} onChange={(event)=>setQty(event.target.value)} fullWidth label="Quantity"/>
            </Grid> 

            <Grid item xs={6}>
                <TextField value={price} error={formError.price} helperText={formError.price} onFocus={()=>handleError(false,'price')} onChange={(event)=>setPrice(event.target.value)} fullWidth label="Price"/>
            </Grid> 

            <Grid item xs={6}>
                <TextField value={color} error={formError.color} helperText={formError.color} onFocus={()=>handleError(false,'color')} onChange={(event)=>setColor(event.target.value)} fullWidth label="Color"/>
            </Grid> 

            <Grid item xs={6}>
                <TextField value={size} error={formError.size} helperText={formError.size} onFocus={()=>handleError(false,'size')} onChange={(event)=>setSize(event.target.value)} fullWidth label="Size"/>
            </Grid> 

            <Grid item xs={6}>
                <TextField value={offerPrice} error={formError.offerprice} helperText={formError.offerprice} onFocus={()=>handleError(false,'offerprice')} onChange={(event)=>setOfferPrice(event.target.value)} fullWidth label="Offer Price"/>
            </Grid> 

            <Grid item xs={6}>
                <TextField value={offerType} error={formError.offertype} helperText={formError.offertype} onFocus={()=>handleError(false,'offertype')} onChange={(event)=>setOfferType(event.target.value)} fullWidth label="Offer Type"/>
            </Grid> 

            <Grid item xs={6} style={{display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
              {btnStatus?
              <div>
                <Button variant="contained" component='label'>
                    Upload Icon
                    <input type="file" hidden accept="images/*" onChange={handleChange}/>
                </Button>
                </div>:<div><Button onClick={handleEditIcon}>Save</Button><Button onClick={handleCancel}>Cancel</Button></div>}
            </Grid>

            <Grid item xs={6} style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
            <Avatar               //Avatar is used for showing selected image
            alt="Icon"
            variant="rounded"
            src={icon.file}
            sx={{ width: 80, height: 80 }}  //sx=>means 'style'
            />
            </Grid>


            </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditData}>Edit Data</Button>
        <Button onClick={handleClose }>Close</Button>
      </DialogActions>
    </Dialog>)
  }
    return(<div className={classes.display_root}>
        <div className={classes.pd_display_box}>
        {listProduct()}
        </div>
        {showCategoryDialog()}
        </div>)
}