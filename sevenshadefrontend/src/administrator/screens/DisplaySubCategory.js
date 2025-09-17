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

export default function DisplaySubCategory()
{
    var classes=useStyles()
    const [open,setOpen]=useState(false)
    const [subCategoryList,setSubCategoryList]=useState([])
    var navigate=useNavigate()

    useEffect(function(){
        fetchAllSubCategory()

      },[])
      const fetchAllSubCategory=async()=>{
        var result=await getData('subcategory_list')
        setSubCategoryList(result.data)

      }
//LIST CATEGORY****************************************************************************************************************************
    function listSubCategory() {
        return (
          <MaterialTable
            title={<TitleComponent width={220} title={'Sub Category List'} listicon=''/>}
            columns={[
              { title: 'Id', field: 'id' }, //title depend on field which is also a column name in MySQL database
              { title: 'Main Category Id', render:(rowData)=><div>{rowData.maincategoryid.id}/{rowData.maincategoryid.maincategoryname}</div> },//or render:(row)=> <>{row.maincategoryid.id}</>
              //render fetch each record one by one  record & kept that record in 'rowData' one by one
              { title: 'Sub Category', field: 'subcategoryname' },
              { title: 'Icon',render:(row)=><><img src={` ${serverURL}${row.icon}`} style={{width:60,height:60,borderRadius:15}}/></>}
            ]}
            data={subCategoryList}  //fetch all subcategories     
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Remove  Category',
                onClick: (event, rowData) => handleDeleteData(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Sub Category',
                isFreeAction:true,
                onClick: (event, rowData) => navigate('/admindashboard/subcategory')
              }
            ]}
          />
        )
      }
//******************************************************************************************************************************************      
//LIST CATEGORY ACTIONS*********************************************************************************************************************
    const handleOpenDialog=(rowData)=>{
    //specify database fields
    setId(rowData.id)
    setMainCategoryId(rowData.maincategoryid.id)
    setSubCategoryName(rowData.subcategoryname)
    setIcon({file:`${serverURL}${rowData.icon}`,bytes:''})
    setTempIcon(`${serverURL}${rowData.icon}`)
    setOpen(true)
  }

    const handleDeleteData=async(rowData)=>{
    Swal.fire({
      title: "Do you want to Delete Sub Category?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body={id:rowData.id}
        var result=await postData('deletesubcategorydata',body)
        if(result.status)
        {
          Swal.fire("Deleted!", "", "success");
        }
        fetchAllSubCategory() 
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }    
//******************************************************************************************************************************************
//SHOW CATEGORY DIALOG ACTIONS**************************************************************************************************************

    const[id,setId]=useState('')
    const[mainCategoryId,setMainCategoryId]=useState('')
    const[subCategoryName,setSubCategoryName]=useState('')
    const[icon,setIcon]=useState({file:'icon.png',bytes:''}) //bytes is used to save Image
    const[tempIcon,setTempIcon]=useState('')
    const[formError,setFormError]=useState([{icon:false}])
    const[btnStatus,setBtnStatus]=useState(true)
    const[mainCategoryList,setMainCategoryList]=useState([])
    useEffect(function(){
        fetchAllMainCategory()

      },[])
      const fetchAllMainCategory=async()=>{
        var result=await getData('maincategory_list')
        console.log("r",result.data)   //for testing 
        setMainCategoryList(result.data)

      }
     const fillMainCategory=()=>{
        return mainCategoryList.map((item)=>{
            return <MenuItem value={item.id}>{item.maincategoryname}</MenuItem>
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
    var result=await postData('editsubcategory_icon',formData)
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
    fetchAllSubCategory()
    setBtnStatus(true)
  }

    const handleEditData=async()=>{

    var err=false

    if(mainCategoryId.length==0)
    {
        handleError("Please input main category","maincategoryid")
        err=true
    }

    if(subCategoryName.length==0)
    {
        handleError("Please input sub category","subcategoryname")
        err=true
    }

    if(err==false)
    {
        var body={id:id,maincategoryid:mainCategoryId,subcategoryname:subCategoryName}
        var result=await postData('editsubcategory_data',body)
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
  fetchAllSubCategory()
  }

  const handleClose=()=>{
    setOpen(false)
  }
    const showCategoryDialog=()=>{

    return(<Dialog open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle>
        <TitleComponent width={210} title={'Update  Category'} listicon=''/>
      </DialogTitle>
      <DialogContent>
        <div style={{margin:5 }}>
            <Grid container spacing={2}>

            <Grid item xs={12}>
            <FormControl fullWidth>
                    <InputLabel>Main Category Id</InputLabel>
                    <Select onFocus={()=>handleError('','maincategoryid')} error={formError.maincategoryid} value={mainCategoryId} label={"Main Category Id"} onChange={(event)=>setMainCategoryId(event.target.value)}>
                        <MenuItem value="Select Category" >Select Category</MenuItem>
                        {fillMainCategory()}
                    </Select>
                    <FormHelperText>{formError.maincategoryid}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <TextField value={subCategoryName} error={formError.subcategoryname} helperText={formError.subcategoryname} onFocus={()=>handleError(false,'subcategoryname')} onChange={(event)=>setSubCategoryName(event.target.value)} fullWidth label="Sub Category Name"/>
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
        <div className={classes.display_box}>
        {listSubCategory()}
        </div>
        {showCategoryDialog()}
        </div>)
}