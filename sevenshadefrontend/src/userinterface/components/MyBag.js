import { serverURL } from "../../services/FetchDjangoApiService";
import { useComponentStyles } from "./ComponentCss";
import { Grid } from "@mui/material";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch } from "react-redux";
export default function MyBag(props) {
  const classes = useComponentStyles();
  var dispatch=useDispatch()
  const items = props?.data
 console.log('CART DATA',items)
  const payitems = [
    { id: '1', icon: 'f21.png' },
    { id: '2', icon: 'f22.png' },
    { id: '3', icon: 'f23.png' },
    { id: '4', icon: 'f24.png' },
    { id: '5', icon: 'f25.png' }
  ];

  const handleChange=(v,product)=>{
    // alert(v)
    product['qty']=v
    if(v>=1)
    {
        dispatch({type:'ADD_PRODUCT',payload:[product.id,product]})
    }
    else
    {
        dispatch({type:'DELETE_PRODUCT',payload:[product.id]})
    }
    props.setPageRefresh(!props.pageRefresh)
    
    }
  const showAllItems = () => {
    return items.map((item) => (
      <div className="cart_container" >
        <Grid container spacing={2}>
          <Grid item xs={3}> 
          
            <div className="cart_item" style={{ justifyContent: 'center' ,alignItems:'center' }}>
              <img src={`${serverURL}/static/${item.icon.split(",")[0]}`} alt={item.description} loading="lazy" style={{ width: '80%', height: '90%' }} />
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className="item-details" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'left' }}>
              <div>
              <div style={{color:'#2d2d2d',fontSize:'1vw',fontWeight:'bolder',letterSpacing:0.6}}>{item?.productid?.productname}</div>
        <div style={{color:'#2d2d2d',fontSize:'.8vw',fontWeight:600,letterSpacing:0.6}}>{item?.productsubname}</div>
        <div style={{color:'#666',fontWeight:'bold',marginTop:12,fontSize:14}}>{item?.offerprice>0?
            <div style={{width:'90%',display:'flex',justifyContent:'space-between'}} >
                <span><s>&#8377;{item?.price}</s></span> 
                <span style={{color:'#000'}}>&#8377;{item?.offerprice}</span></div>:<span>{item?.price}</span>}</div>

              </div>
              <div style={{ display: 'flex', alignItems:'left',marginTop:'2%'}}>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div style={{ fontSize: '1vw', justifyContent: 'center' }}>COLOR</div>
                <div style={{ borderLeft: '1px solid #ececec', height: 20, margin: 10, alignItems: 'center' }}></div>
                <div style={{ fontSize: '1vw' }}>
  <select style={{ width: 'auto', border: 'none', fontSize: '1vw', borderRadius: '3px', padding: '5%', height: 'auto', overflowY: 'scroll', maxHeight: '150px' }}>
    <option>S</option>
    <option data_testid="size-0">XS</option>
    <option data_testid="size-1">S</option>
    <option data_testid="size-2">M</option>
    <option data_testid="size-3">L</option>
    <option data_testid="size-4">XL</option>
    <option data_testid="size-5">2XL</option>
  </select>
</div>


                
                <div style={{marginTop:'7%'}}>
                   <PlusMinusComponent value={item.qty} onChange={(v)=>handleChange(v,item)} />
                   </div> 


              </div>
              </div>
              
            </div>
            
          </Grid>
        </Grid>
        <div style={{ borderLeft: '10px solid #ececec', width: '90%', margin: 10, alignItems: 'center' }}></div>
      </div>
      
    ));
  };

  const showTotal = () => {
    return (
      <div style={{justifyContent:'center',flexDirection: 'column',alignItems:'center',margin:'5%'}}>
        <div style={{}}>
          <div style={{fontWeight:1000}}>TOTAL</div>
          <hr style={{ width: '100%', borderTop: '1px solid #ececec', margin: '20px 0' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '5%' }}>
  <div style={{ fontWeight: 'bold', flex: '1', textAlign: 'left' }}>Sub-total</div>
  <div style={{ flex: '1', textAlign: 'right' }}>£36.50</div>
</div>          
<div style={{fontWeight:'bold',marginTop:'5%'}}>Delivery</div>
<div style={{ marginTop: '5%', color: '#525050', width: 'fit-content' }}>
  <select style={{ padding: '5%', border: 'none', borderRadius: '5px', backgroundColor: '#fff', color: '#525050',fontSize:'1vw' }}>
    <option>Standard Delivery (£7.00)</option>
    {/* Add more options here if needed */}
  </select>
</div>
<hr style={{ width: '100%', borderTop: '1px solid #2d2d2d', margin: '10px 0' }} />

        </div>
        <button style={{backgroundColor:'#018849',color:'white',fontWeight:'bold',fontSize:20,marginTop:16,paddingBlock:4,justifyContent:'space-evenly',paddingRight:10,paddingLeft:10,width:'100%',borderBlockColor:'#018849'}}>CHECKOUT</button>

        <div >
        <div style={{fontWeight:'bold',marginTop:'5%'}}>WE ACCEPT:</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {showAllPayItems()}
          </div>
        </div>
        <div style={{fontSize:'0.8vw',justifyContent:'center',alignItems:'center',marginTop:'5%'}}>Got a discount code? Add it in the next step.</div>
      </div>
    );
  };

  const showAllPayItems = () => {
    return payitems.map((item) => (
      <div key={item.id} style={{ width: '30px', height: '20px', marginBottom: 1, backgroundColor: '#f2f2f2', margin: 5 }}>
        <img src={`${serverURL}/static/${item.icon}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ));
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',marginLeft:'20%',marginRight:'20%' }}>
      <Grid container spacing={2} style={{ width: '100%' }}>
        <Grid item xs={8}>
          <div style={{ marginTop: 10, marginBottom: 10, backgroundColor: 'white', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,marginBottom:2,padding:'0.8%'}}>
            <div style={{ fontWeight: 'bold', fontSize: '2vw',marginLeft:'5%' }}>MY BAG</div>
            <div style={{ fontSize: '1vw',marginRight:'5%' }}>Items are reserved for 60 minutes</div>
          </div>
          <div style={{ backgroundColor: 'white', width: '100%',marginTop:'2%' ,padding:'0.8%'}}>
            {showAllItems()}
          </div>
          <div style={{ marginTop:'2%', marginBottom: 10, backgroundColor: 'white', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,marginBottom:2,padding:'0.8%'}}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '3%' }}>
  <div style={{ display: 'flex', alignItems: 'center' ,marginTop: 10, marginBottom: 10,}}>
    <img src={`${serverURL}/static/deliverytruck.png`} loading="lazy" style={{ width: 25, height: 25, objectFit: 'cover', marginTop: '2%' }} />
    <div style={{ marginLeft: '5%', fontWeight: 'bold', fontSize: '1.1vw' }}>FREE * STANDARD DELIVERY.</div>
  </div>
  <div style={{ marginLeft: '14%', fontSize: '0.8vw', marginBottom: '2%' }}>Faster delivery options available to most countries.</div>
  <div style={{ marginLeft: '14%', marginTop:5, fontSize: '0.8vw' }}>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li style={{ textDecoration: 'underline', fontSize: '0.8vw' }}>More info</li>
    </ul>
  </div>
</div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ backgroundColor: 'white', width: '100%',padding:'5%',marginTop:'5%' }}>
            {showTotal()}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
