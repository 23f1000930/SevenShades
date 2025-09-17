import { useState } from "react";
import { useStyles } from "./AdminDashboardCss";
import { Avatar, AppBar, Box, Toolbar, Typography, Grid, Paper } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchDjangoApiService";

//icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import YardIcon from '@mui/icons-material/Yard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
//

import Category from "./Category";
import DisplayAllCategory from "./DisplayAllCategory"
import SubCategory from "./SubCategory";
import DisplaySubCategory from "./DisplaySubCategory";
import Product from './Product'
import DisplayProduct from './DisplayProduct'
import ProductDetail from './ProductDetail'
import DisplayProductDetail from "./DisplayProductDetail";
import Brand from "./Brand";
import DisplayBrand from "./DisplayBrand";
import Banner from "./Banner";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function AdminDashboard(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage?.getItem('ADMIN'))

  
  const theme = useTheme();
  const md_matches = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Sevenshades
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spaces={3} style={{ paddingInlineStart: 5 }} >
        {md_matches?<div></div>:
        <Grid item xs={2.2} >
          <Paper >
            <div className={classes.leftBarStyle}>
              <img src={`${serverURL}/static/${admin?.picture}`} style={{ width: 70, height: 70, borderRadius: 35 }} />
              <div className={classes.nameStyle}>{admin?.adminname}</div>
              <div className={classes.emailStyle}>{admin?.emailid}</div>
              <div className={classes.phoneStyle}>+91{admin?.mobileno}</div>
            </div>
            <div className={classes.menuStyle}>
              <List>
                <Divider />

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>} />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/displayallcategory')} >
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Main Category List</span>} />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/displaysubcategory')} >
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Sub Category List</span>} />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/displaybrand')} >
                    <ListItemIcon>
                      <YardIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Brand List</span>} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/displayproduct')}   >
                    <ListItemIcon>
                      <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Product List</span>} />
                  </ListItemButton>
                </ListItem>



                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/displayproductdetail')}  >
                    <ListItemIcon>
                      <AddShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Product Detail List</span>} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/banner')} >
                    <ListItemIcon>
                      <ViewCarouselIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Banners</span>} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton >
                    <ListItemIcon>
                      <SummarizeIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Sales Report</span>} />
                  </ListItemButton>
                </ListItem>


                <Divider />
                <ListItem disablePadding>
                  <ListItemButton >
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </Paper>

        </Grid>}

        <Grid item xs={9.8} style={{ padding: 0 }}>

          <Routes>
            
            <Route element={<Category />} path={"/category"} />
            <Route element={<DisplayAllCategory />} path={"/displayallcategory"} />
            <Route element={<SubCategory />} path={"/subcategory"} />
            <Route element={<DisplaySubCategory />} path={"/displaysubcategory"} />
            <Route element={<Brand />} path={"/brand"} />
            <Route element={<DisplayBrand />} path={"/displaybrand"} />
            <Route element={<Product />} path={"/product"} />
            <Route element={<DisplayProduct />} path={"/displayproduct"} />
            <Route element={<ProductDetail />} path={"/productdetail"} />
            <Route element={<DisplayProductDetail />} path={"/displayproductdetail"} />
            <Route element={<Banner />} path={"/banner"} />

          </Routes>
        </Grid>
      </Grid>

    </Box>
  )
}