import { Grid,TextField,Button,Avatar } from "@mui/material";
import { useState } from "react";
import { useStyles } from "./CategoryCss";
import TitleComponent from "../components/admin/TitleComponent";
import { postData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";
import listimage from "../../images/list.png"
import iconimage from "../../images/icon.png"
export default function Category(props)
{
    var classes=useStyles()
    const[mainCategoryName,setMainCategoryName]=useState('')
    const[icon,setIcon]=useState({file:iconimage, bytes:''}) //bytes is used to save Image
    const[formError,setFormError]=useState([{icon:false}]) //formError is a dictionary
    const handleChange=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        handleError(false,"icon")
    }

    const handleError=(errormessage,label)=>{  //prev means previous value of error
        setFormError((prev)=>({...prev,[label]:errormessage}))
    }

    const handleClick=async()=>{
        var err=false
        if(mainCategoryName.length==0)
        {
            handleError("Please input main category","maincategoryname")
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
        formData.append('maincategoryname',mainCategoryName) //left side is form key
        formData.append('icon',icon.bytes) // when form key is matched/same with model field/key then record is submitted
        var result=await postData('maincategory_submit',formData)
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
    <div className={classes.main_brand_banner_box}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TitleComponent width={185} title={'Main Category'} listicon={listimage} link={'/admindashboard/displayallcategory'}/>
            </Grid>

            <Grid item xs={12}>
                <TextField value={mainCategoryName} error={formError.maincategoryname} //error={} checks true/false & color the textfield red for false
                 helperText={formError.maincategoryname} //helperText={} use to show error message
                 onFocus={()=>handleError(false,'maincategoryname')} onChange={(event)=>setMainCategoryName(event.target.value)} fullWidth label="Main Category Name"/>
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