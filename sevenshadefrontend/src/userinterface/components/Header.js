import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, Badge} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Grid } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchBarComponent from './SearchBarComponent';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';
import DrawerComponent from './DrawerComponent';
import { postData, getData, serverURL } from '../../services/FetchDjangoApiService';
import {useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux';

export default function Header(props) {

  var product = useSelector(state => state.product)  //"state" represent "initialState"
  var keys=Object.values(product)

  const theme = useTheme();
  const md_matches = useMediaQuery(theme.breakpoints.down('md'));
  const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false)
  const [subCategoryList, setSubCategoryList] = useState([])
  const [productList, setProductList] = useState([])
  const [brandList, setBrandList] = useState([])

  const [backgroundColor, setBackgroundColor] = useState('')
  const [subCategoryColor, setSubCategoryColor] = useState('')
  const [statusSubMenu, setStatusSubMenu] = useState(false)

  const navigate=useNavigate()
  const handleClickHome=()=>{
    navigate('/home')
     
   }
  const fetchAllProducts = async (item) => {
    var result = await postData('user_product_list', {subcategoryid:item.id, maincategoryid:item.maincategoryid.id})
    setProductList(result.data)
  }

  const fetchAllBrand = async (item) => {
    var result = await postData('user_brand_list_by_mid_sid', {subcategoryid:item.id, maincategoryid:item.maincategoryid.id})
    // or var result = await postData('user_brand_list', {subcategoryid:item.id, maincategoryid:backgroundColor})
    setBrandList(result.data)
    //console.log(result.data)
  }

  const fetchAllSubCategory = async (id) => {
    var result = await postData('user_subcategory_list_by_maincategoryid', { maincategoryid: id })
    setSubCategoryList(result.data)
    setBackgroundColor(id)
  }

  useEffect(() => {
    // Update parent component's subCategoryList state whenever subCategoryList changes
    /*Imagine a situation where the "Home(Parent)" doesn't pass "onData" then 
    If "Header(Child)" tries to call props.onData(someData) without checking if it exists,
     JavaScript will throw an error*/

     //Safety: Prevents errors if the function is not passed from the parent.
     
     /*The line if (props.onData) is useful to ensure that the function "onData"
      exists before trying to call it. This prevents errors in case the parent component"
       doesn't pass the onData function as a prop.*/
    if (props.onData) {
      props.onData(subCategoryList, backgroundColor);
  }
  }, [subCategoryList, backgroundColor]); // Run this effect only when subCategoryList changes


  useEffect(function () {
    fetchAllSubCategory(1)
  }, [])


  const handleSubMenu = (item) => {
    fetchAllBrand(item)
    fetchAllProducts(item)
    
    setStatusSubMenu(true)
    setSubCategoryColor(item.id)
  }



  const showAllSubCategory = () => {
    return subCategoryList.map((item) => {
      /*{return <Button onMouseOver={() => handleSubMenu(item)} onMouseLeave={()=>setSubCategoryColor('')} style={{ background: subCategoryColor==item.id? "#fff" : "#525050",color: subCategoryColor==item.id? "#666" : "#fff", marginRight: 5 }}>{item.subcategoryname}</Button>}*/
      return <div onMouseOver={() => handleSubMenu(item)} onMouseLeave={()=>setSubCategoryColor('')} style={{ background: subCategoryColor==item.id? "#fff" : "#525050",color: subCategoryColor==item.id? "#666" : "#fff", marginRight: 0, padding:"14.5px 13px" }}>{item.subcategoryname}</div>
    })
  }

  const showAllProducts = () => {
    return productList.slice(0,9).map((item) => {
      return <div style={{ padding: 2, display: 'flex'}}>
        <span><img src={`${serverURL}${item?.icon}`} style={{ width: 30, height: 30, padiing: 2, borderRadius:15, cursor:'pointer' }} /></span>
        <span style={{ color: '#000',marginLeft:15, fontWeight:400, cursor:'pointer'}}>{item?.productname}</span>
        </div>

    })
  }

  const showAllBrands = () => {
    return brandList.slice(0,10).map((item) => {
      {/*return <div style={{ padding: 5, display: 'flex', justifyContent: 'space-between' }}>*/}
      return <div style={{ padding: 2, display: 'flex' }}>
        <span><img src={`${serverURL}${item?.icon}`} style={{ width: 30, height: 30, padiing: 2, borderRadius:15, cursor:'pointer' }} /></span>
        <span style={{ color: '#000',marginLeft:15, fontWeight:400, cursor:'pointer' }}>{item?.brandname}</span></div>

    })
  }

  const showSubMenu = () => {
    return (<div onMouseLeave={() => setStatusSubMenu(false)} style={{ padding: 25, position: 'absolute', zIndex: 2, left: 100, top: 128, width: '80%', height: 'auto', background: '#fff' }}>
      <Grid container spacing={2} >

        <Grid item xs={4}>
          <div style={{ fontWeight: 'bold', color: '#666', letterSpacing: 1 }}>
            SHOP BY PRODUCT
            <Divider />
            <div style={{display:'flex',flexDirection:'column', paddingTop:20}}>
            <span style={{marginLeft:7, fontWeight:500, color:'#0652DD', cursor:'pointer', marginBottom:5}}>View all</span>
            {showAllProducts()}
            </div>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div style={{ fontWeight: 'bold', color: '#666', letterSpacing: 1 }}>
            SHOP BY BRAND
            <Divider />
            <div style={{display:'flex',flexDirection:'column', paddingTop:20}}>
            <span style={{marginLeft:3, fontWeight:500, color:'#0652DD', cursor:'pointer', marginBottom:5}}>View all</span>
            {showAllBrands()}
            </div>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div style={{ fontWeight: 'bold', color: '#666', letterSpacing: 1 }}>
            SHOP BY FIT
            <Divider />
          </div>
        </Grid>

      </Grid>
    </div>)
  }


  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleGotoCartPage=()=>{
    navigate('/mybagdisplay')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#2d2d2d' }} position="static">
        <Toolbar>
          {sm_matches ? <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton> : <div></div>}


          <Typography variant="h6" component="div" style={{ display: 'flex', alignItems: 'center', fontFamily: 'League Gothic', fontSize: 36, letterSpacing: 1, cursor: 'pointer' }} onClick={()=>handleClickHome()}>
            SevenShades
          </Typography>
          {sm_matches ? <div></div> : <div style={{ display: 'flex', alignItems: 'center', width: 250, justifyContent: 'space-evenly', paddingLeft:40 }}>
            <Divider style={{ color: '#fff' }} orientation="vertical" flexItem />
            <Button style={{ background: backgroundColor == 1 ? '#525050' : '#2d2d2d', fontFamily: 'Kanit', color: '#fff', fontWeight: 'bold', fontSize: 18, padding: "16px 32px", borderRadius:0 }} color="inherit" onClick={() => fetchAllSubCategory(1)}>MEN</Button>
            <Button style={{ background: backgroundColor == 2 ? '#525050' : '#2d2d2d', fontFamily: 'Kanit', color: '#fff', fontWeight: 'bold', fontSize: 18, padding: "16px 32px", borderRadius:0 }} color="inherit" onClick={() => fetchAllSubCategory(2)}>WOMEN</Button>
          </div>}

          {md_matches ? <div></div> : <SearchBarComponent />}
          <div style={{ marginLeft: 'auto', width: 150, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <PersonOutlineOutlinedIcon style={{ fontSize: 32 }} />
            <Badge badgeContent={keys.length} color="primary">
            <ShoppingBagOutlinedIcon onClick={handleGotoCartPage} style={{ fontSize: 28 }} />
            </Badge>
          </div>
        </Toolbar>
      </AppBar>

      {md_matches ? <div></div>:
        <AppBar style={{ background: '#525050', height:50, justifyContent:'center', paddingLeft:100 }} position="static">
          <Toolbar>
            <div style={{ display: 'flex' }}>
              {showAllSubCategory()}
            </div>
          </Toolbar>
        </AppBar>}
      <DrawerComponent open={open} setOpen={setOpen} />
      {statusSubMenu ? showSubMenu() : <div></div>}
    </Box>
  );
}
