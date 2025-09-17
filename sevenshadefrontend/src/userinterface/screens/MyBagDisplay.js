import Header from "../components/Header"
import MyBag from "../components/MyBag"
import Footer from "../components/Footer"
import Bottom from "../components/Bottom"
import {useState,useEffect} from "react"
import { getData } from "../../services/FetchDjangoApiService"
import { useSelector } from "react-redux"
export default function MyBagDisplay(props){
    var product=useSelector(state=>state.product)
  var products=Object.values(product)
  const [pageRefresh,setPageRefresh]=useState(false)
    return(<div style={{position:'relative',width:'100%'}}>
     <Header />    

     <div style={{display:'flex',width:'100%',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
     
    <div style={{marginTop:30,width:'100%',display:'flex',justifyContent:'center',backgroundColor:'#ececec',paddingBottom:10}}>
     <MyBag data={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
    </div>
   
    <div style={{ borderTop:'1px solid #ececec', height:20, margin:0.1 }}></div>
    <div style={{margin:10,width:'100%',display:'flex',justifyContent:'center'}}>
     <Footer />
    </div>
    <div style={{backgroundColor: '#ececec',width:'100%',display:'flex',justifyContent:'space-between',padding:0,marginLeft:0,marginRight:0,}} >
     <Bottom />
    </div>
    </div>
    </div>)    
  
}