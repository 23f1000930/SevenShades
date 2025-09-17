import { Button } from "@mui/material";
import { useState,useEffect } from "react";

export default function PlusMinusComponent(props)
{ const [value,setValue]=useState(0)
  useEffect(function(){
setValue(props.value)

  },[props.value])

    const handlePlus=()=>{
     var v=value
     v=v+1
     setValue(v)
     props.onChange(v)
    }
    const handleMinus=()=>{
        var v=value
        if(v>=1)
        {v=v-1
        setValue(v)}
        props.onChange(v)
   

    }
 return(
   <div>
    {value==0?<div><Button  variant="contained" style={{fontSize:'1.2vw', width:'20vw',background:'#000',color:'#fff'}} onClick={handlePlus}>Add to Bag</Button></div>:<div style={{width:'10vw',display:'flex', alignItems:'center',justifyContent:'space-between'}}><Button variant="contained" style={{fontSize:'1.2vw', width:'1.5vw',background:'#000',color:'#fff'}} onClick={handleMinus}>-</Button><span  style={{fontSize:'1.2vw', fontWeight:'bolder', width:'1.5vw',textAlign:'center'}}>{value}</span><Button variant="contained" style={{fontSize:'1.2vw', width:'1.5vw',background:'#000',color:'#fff'}} onClick={handlePlus}>+</Button></div>}
   </div>

 )


} 