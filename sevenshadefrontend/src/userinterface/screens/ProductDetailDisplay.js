import Header from "../components/Header"
import Footer from "../components/Footer"
import Bottom from "../components/Bottom"
import {useState,useEffect} from 'react'
import { postData,serverURL } from "../../services/FetchDjangoApiService"
import ProductDetailComponent from "../components/ProductDetailComponent"
import YouMightAlsoLikeComponent from "../components/YouMightAlsoLikeComponent"
import StyleItWithComponent from "../components/StyleItWithComponent"
import RecentlyViewedComponent from "../components/RecentlyViewedComponent"
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom"
export default function ProductsHome(props) {
  var location=useLocation()  
  var productid=location.state.productid
  const [productList,setProductList]=useState([])
  const [pageRefresh,setPageRefresh]=useState(false)
  var fetchAllProducts=async()=>{
    var result=await postData('user_productsdetails_by_id',{productid:productid})
    console.log("PRODUCTS:",result)
    setProductList(result.data)
  }
  useEffect(function(){
    fetchAllProducts()
},[])
  return (
    <div style={{ width: '100vw', justifyContent: 'center' }}>
      <Header />

      <div style={{ display: 'flex', width: '80%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', marginTop: 30, width: '90%', display: 'flex', marginLeft: '40%', justifyContent: 'center' }}>
          <ProductDetailComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} productList={productList} />
        </div>
        <Grid container spacing={2} item xs={12}>
          <Grid container spacing={2} item xs={10}>
          <div style={{ borderTop: '1px solid #ececec', width: '100%', margin: 0.5}}></div>

          <div style={{ display: 'flex', marginTop: 30, width: '90%', display: 'flex', margin: 30, justifyContent: 'center' }}>
            <YouMightAlsoLikeComponent />
          </div>
          <div style={{ display: 'flex', marginTop: 30, width: '90%', display: 'flex', margin: 30, justifyContent: 'center' }}>
            <StyleItWithComponent />
          </div>
          <div style={{ display: 'flex', marginTop: 30, width: '90%', display: 'flex', margin: 30, justifyContent: 'center' ,marginLeft:'30%'}}>
            <RecentlyViewedComponent />
          </div>
          </Grid>
        </Grid>
      </div>
      <div style={{ borderTop: '1px solid #ececec', height: 20, margin: 0.1 }}></div>
      <div style={{ margin: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Footer />
      </div>
      <div style={{ backgroundColor: '#ececec', width: '100%', display: 'flex', justifyContent: 'space-between', padding: 0, marginLeft: 0, marginRight: 0 }} >
        <Bottom />
      </div>
    </div>
  );
}

/* 
export default function ProductsHome(props)
{
    return(<div style={{position:'relative',width:'100%',justifyContent:'center',maxWidth:1200}}>
     <Header />    
     <div style={{display:'flex',width:'99%',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    <div style={{display: 'flex',marginTop:30,width:'90%',display:'flex',margin:30,justifyContent:'center'}}>
     <ProductDetailPage />
    </div>
    <div style={{ borderTop:'1px solid #ececec', height:20, margin:0.1 }}></div>
    <div style={{margin:10,width:'100%',display:'flex',justifyContent:'center'}}>
     <Footer />
    </div>
    <div style={{backgroundColor: '#ececec',width:'100%',display:'flex',justifyContent:'space-between',padding:0,marginLeft:0,marginRight:0}} >
     <Bottom />
    </div>
    </div>
    </div>)*/