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
import Checkbox from '@mui/joy/Checkbox';

export default function DisplayProduct()
{
    var classes=useStyles()
    const [open,setOpen]=useState(false)
    const [productList,setProductList]=useState([])
    var navigate=useNavigate()

    useEffect(function(){
        fetchAllProduct()

      },[])
      const fetchAllProduct=async()=>{
        var result=await getData('product_list')
        setProductList(result.data)

      }

      const dispalyAllBrands = (linkedbrands) => {
        return linkedbrands.map((item) => {
          return <div value={item.id} ><b>/{item.brandname}/</b></div>
        })
      }

//LIST CATEGORY****************************************************************************************************************************
    function listProduct() {
        return (
          <MaterialTable
            title={<TitleComponent width={160} title={'Product List'} listicon=''/>}
            columns={[
              { title: 'Id', field: 'id' }, //title depend on field which is also a column name in MySQL database
              { title: 'Main Category Id', render:(rowData)=><div>{rowData.maincategoryid.id}/{rowData.maincategoryid.maincategoryname}</div> },//or render:(row)=> <>{row.maincategoryid.id}</>
              { title: 'Sub Category Id', render:(rowData)=><div>{rowData.subcategoryid.id}/{rowData.subcategoryid.subcategoryname}</div> },
              { title: 'Brand Name', render: (rowData) => <div>{dispalyAllBrands(rowData.brandids)}</div> },
              //render fetch each record one by one  record
              { title: 'Products', field: 'productname' },
              { title: 'Product Description', field: 'productdescription' },
              { title: 'Icon',render:(row)=><><img src={` ${serverURL}${row.icon}`} style={{width:60,height:60,borderRadius:15}}/></>}
            ]}
            data={productList}  //fetch all products     
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
                tooltip: 'Add New Product',
                isFreeAction:true,
                onClick: (event, rowData) => navigate('/admindashboard/product')
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
    const[productName,setProductName]=useState('')
    const[productDescription,setProductDescription]=useState('')
    const[icon,setIcon]=useState({file:'icon.png',bytes:''}) //bytes is used to save Image
    const[tempIcon,setTempIcon]=useState('')
    const[formError,setFormError]=useState([{icon:false}])
    const[btnStatus,setBtnStatus]=useState(true)
    const[mainCategoryList,setMainCategoryList]=useState([])
    const[subCategoryList,setSubCategoryList]=useState([])
    const[brandList,setBrandList]=useState([])
    const [brandCheckedIds, setBrandCheckedIds] = useState([]);

    const handleBrandCheckboxChange = (event) => {
      const index = brandCheckedIds.indexOf(event.target.value);
      if (index === -1) {
          setBrandCheckedIds([...brandCheckedIds, event.target.value]);
      } else {
          setBrandCheckedIds(brandCheckedIds.filter((id) => id !== event.target.value));
      }
  };
  
    const showCheckedBrandIds=(checkedBrands)=>{
      setBrandCheckedIds((prevIds) => [
        ...prevIds,
        ...checkedBrands.map(item => item.id.toString())
      ]);
      
    }
  
    const handleBrandCheckbox = () => {
      return brandList.map((item) => (
          <Grid item xs={3} key={item.id}>
              <Checkbox
                  checked={brandCheckedIds.includes(item.id.toString())}
                  onChange={handleBrandCheckboxChange}
                  value={item.id.toString()}
                  label={item.brandname}
              />
          </Grid>
      ));
  };
  


    const handleOpenDialog=(rowData)=>{
    //specify database fields
    setId(rowData.id)
    setMainCategoryId(rowData.maincategoryid.id)
    setSubCategoryId(rowData.subcategoryid.id)
    showCheckedBrandIds(rowData.brandids)
    setProductName(rowData.productname)
    setProductDescription(rowData.productdescription)
    setIcon({file:`${serverURL}${rowData.icon}`,bytes:''})
    setTempIcon(`${serverURL}${rowData.icon}`)
    setOpen(true)
    fetchAll_Subcategory_and_Brand(rowData.maincategoryid.id)    //////////
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
        var result=await postData('deleteproductdata',body)
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
        fetchAllMSP()

      },[])
      const fetchAllMSP=async()=>{
        var result=await getData('maincategory_list')
        console.log("Result",result.data)   //for testing 
        setMainCategoryList(result.data)
        
        //var result=await getData('subcategory_list')  // this displays all subcategory 
        //setSubCategoryList(result.data)      //so instead of using this we use fetchAllSubcategory in line 146
      }

      const fetchAll_Subcategory_and_Brand = async (mid) => {
        var result = await postData('product_subcategory_list_by_maincategoryid', { maincategoryid: mid })
        setSubCategoryList(result.data)
        // alert(JSON.stringify(result.data))   ------>for testing

        var result = await postData('product_brand_list_by_maincategoryid', { maincategories: mid })
        setBrandList(result.data)
    }

    const handleFetch_Subcategory_and_Brand = (event) => {
        setBrandId('')
        setSubCategoryId('')
        setMainCategoryId(event.target.value)
        fetchAll_Subcategory_and_Brand(event.target.value)
    }

     const fillMainCategory=()=>{
        return mainCategoryList.map((item)=>{
            return <MenuItem value={item.id}>{item.maincategoryname}</MenuItem>
        })
    }

    const fillSubCategory=()=>{
      return subCategoryList.map((item)=>{
          return <MenuItem value={item.id}>{item.subcategoryname}</MenuItem>
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
    var result=await postData('editproduct_icon',formData)
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
    fetchAllProduct()
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

    if(brandCheckedIds.length==0)
    {
        handleError("Please input brand id","brandid")
        err=true
    }

    if(productName.length==0)
    {
        handleError("Please input product","productname")
        err=true
    }

    if(productDescription.length==0)
    {
        handleError("Please input product description","productdescription")
        err=true
    }

    if(err==false)
    {
        var body={id:id, maincategoryid:mainCategoryId, subcategoryid:subCategoryId, brandids:brandCheckedIds, productname:productName, productdescription:productDescription}
        var result=await postData('editproduct_data',body)
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
  fetchAllProduct()
  }

  const handleClose=()=>{
    setBrandCheckedIds([])
    setOpen(false)
  }
    const showCategoryDialog=()=>{

    return(<Dialog open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle>
        <TitleComponent width={205} title={'Update  Product'} listicon=''/>
      </DialogTitle>
      <DialogContent>
        <div style={{margin:5 }}>
            <Grid container spacing={2}>

            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Main Category Id</InputLabel>
                    <Select onChange={handleFetch_Subcategory_and_Brand} onFocus={()=>handleError('','maincategoryid')} error={formError.maincategoryid} value={mainCategoryId} label={"Main Category Id"}>
                        <MenuItem value="Select Category" >Select Category</MenuItem>
                        {fillMainCategory()}
                    </Select>
                    <FormHelperText>{formError.maincategoryid}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Sub Category Id</InputLabel>
                    <Select onFocus={()=>handleError('','subcategoryid')} error={formError.subcategoryid} value={subCategoryId} label={"Sub Category Id"} onChange={(event)=>setSubCategoryId(event.target.value)}>
                        <MenuItem value="Select Category" >Select Category</MenuItem>
                        {fillSubCategory()}
                    </Select>
                    <FormHelperText>{formError.subcategoryid}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
              <div style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Choose Brands</div>
            </Grid>

            {handleBrandCheckbox()}

            <Grid item xs={12}>
                <TextField value={productName} error={formError.productname} helperText={formError.productname} onFocus={()=>handleError(false,'productname')} onChange={(event)=>setProductName(event.target.value)} fullWidth label="Product Name"/>
            </Grid> 

            <Grid item xs={12}>
                <TextField value={productDescription} error={formError.productdescription} helperText={formError.productdescription} onFocus={()=>handleError(false,'productdescription')} onChange={(event)=>setProductDescription(event.target.value)} fullWidth label="Product Description"/>
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