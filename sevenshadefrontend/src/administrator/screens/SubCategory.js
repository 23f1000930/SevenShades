import {FormHelperText,FormControl,InputLabel,Select,MenuItem,Grid,TextField,Button,Avatar } from "@mui/material";
import { useEffect,useState } from "react";
import { getData } from "../../services/FetchDjangoApiService";
import {useStyles } from "./CategoryCss";
import TitleComponent from "../components/admin/TitleComponent";
import { postData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";
import listimage from "../../images/list.png"
import iconimage from "../../images/icon.png"
export default function SubCategory(props)
{
    var classes=useStyles()
    const[mainCategoryId,setMainCategoryId]=useState('')
    const[subCategoryName,setSubCategoryName]=useState('')
    const[icon,setIcon]=useState({file:iconimage, bytes:''}) //bytes is used to save Image
    const[formError,setFormError]=useState([{icon:false}])
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
        handleError(false,"icon")
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

        if(subCategoryName.length==0)
        {
            handleError("Please input sub category","subcategoryname")
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
        formData.append('subcategoryname',subCategoryName)
        formData.append('icon',icon.bytes)
        var result=await postData('subcategory_submit',formData)
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
    <div className={classes.sub_box}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TitleComponent width={175} title={'Sub Category'} listicon={listimage} link={'/admindashboard/displaysubcategory'} />
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Main Category Id</InputLabel>
                    <Select onFocus={()=>handleError('','maincategoryid')} error={formError.maincategoryid} value={mainCategoryId} label={"Main Category Id"} onChange={(event)=>setMainCategoryId(event.target.value)}>
                        <MenuItem>Select Main Category</MenuItem>
                        {fillMainCategory()}
                    </Select>
                    <FormHelperText>{formError.maincategoryid}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <TextField error={formError.subcategoryname} helperText={formError.subcategoryname} onFocus={()=>handleError(false,'subcategoryname')} onChange={(event)=>setSubCategoryName(event.target.value)} fullWidth label="Sub Category Name"/>
            </Grid> 

            <Grid item xs={6} style={{display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Button variant="contained" component='label'>
                    Upload Icon
                    <input type="file" hidden accept="images/*" onChange={handleChange}/>
                </Button>
                {formError.icon?<div style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:3,color:'#d32f2f', fontSize:'0.75rem',fontWeight:400}}>{formError.icon}</div>:<></>}
            </Grid>

            <Grid item xs={6} style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
            <Avatar               //Avatar is used for showing selected image
            alt="Icon"
            variant="rounded"
            src={icon.file}
            sx={{ width: 80, height: 80 }}  //sx=>means 'style'
/>
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
}//balnk icon handelling in line 78