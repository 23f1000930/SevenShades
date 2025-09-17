import { Grid,TextField,Button,Avatar } from "@mui/material";
import { useState } from "react";
import { useStyles } from "./CategoryCss";
import TitleComponent from "../components/admin/TitleComponent";
import { postData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";
import listimage from "../../images/list.png"
export default function Banner(props)
{
    var classes=useStyles()
    const[bannerDescription,setBannerDescription]=useState('')
    const[pictures,setPictures]=useState({file:[] ,bytes:[]}) //bytes is used to save Image
    const[formError,setFormError]=useState([{icon:false}])
    const handleChange=(event)=>{
        var files=Object.values(event.target.files)  //we take values of files/images by using Object.values
        if(files.length>=4 && files.length<=7)
        setPictures({file:files, bytes:event.target.files})
    
    else
        alert("Please input min. 4 & max 7 pictures...")
        handleError(false,"icon")
    }
    
    const showImages=()=>{
        return pictures?.file?.map((item)=>{
            return <span><img src={URL.createObjectURL(item)} style={{width:40, height:40, borderRadius:10, marginRight:3}} /></span>
        })
    }

    const handleError=(errormessage,label)=>{  //prev means previous value of error
        setFormError((prev)=>({...prev,[label]:errormessage}))
    }

    const handleClick=async()=>{
        var err=false
        if(bannerDescription.length==0)
        {
            handleError("Please input main category","bannerdescription")
            err=true
        }

        if(pictures.bytes.length==0) // icon named image is already exist so we have to work on bytes
        {
            handleError("Please select some picures","picures")
            err=true
        }

        if(err==false)
        {
        var formData=new FormData()
        formData.append('bannerdescription',bannerDescription)
        pictures?.file?.map((item)=>{
            formData.append('pictures', item)
        }) //-------------> it becomes an array because variable is one ('icon') & value are multiple & send to backend
        var result=await postData('banner_submit',formData)
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
                <TitleComponent width={120} title={'Banner'} listicon={listimage}/>
            </Grid>

            <Grid item xs={12}>
                <TextField error={formError.bannerdescription} helperText={formError.bannerdescription} onFocus={()=>handleError(false,'bannerdescription')} onChange={(event)=>setBannerDescription(event.target.value)} fullWidth label="Banner Description"/>
            </Grid> 

            <Grid item xs={6} style={{display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Button variant="contained" component='label'>
                    Upload Pictures
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
}//balnk icon handelling in line 78