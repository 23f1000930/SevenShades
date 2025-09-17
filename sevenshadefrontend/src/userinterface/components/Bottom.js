import { serverURL } from "../../services/FetchDjangoApiService"
import {Grid} from "@mui/material";
export default function Bottom(props)
{
    var bottomitems=[{id:'1',headingname:'HELP & INFORMATION',subheadingname:["Help","Track order","Delivery & returns","Sitemap"]},
    {id:'2',headingname:'ABOUT ASOS',subheadingname:["About us","Careers at ASOS","Corporate responsibility","Investors' site"]},
    {id:'3',headingname:'MORE FROM ASOS',subheadingname:["Mobile and ASOS apps","ASOS Marketplace","Gift vouchers","Black Friday","ASOS x Thrift+","Discover the ASOS Credit Card","Help Improve the ASOS Website"]},]
    
    var countryitems=[{id:'1',icon:'c1.png'},
    {id:'2',icon:'c2.png'},
    {id:'3',icon:'c3.png'},
    {id:'4',icon:'c4.png'},
    {id:'5',icon:'c5.png'},
    {id:'6',icon:'c6.png'},
    {id:'7',icon:'c7.png'},
    {id:'8',icon:'c8.png'},
    {id:'9',icon:'c9.png'},
    {id:'10',icon:'c10.png'}]

    const showAllBottomItems = () => {
        return (<div style={{ justifyContent: 'space-between',paddingTop:10,paddingLeft:100,paddingRight:100}} >
            <Grid item xs={12} container spacing={20} width='100%'>
              {bottomitems.map((item) => (
                  <Grid item xs={3} >
                    <div style={{color:"#666",fontSize:13,fontWeight:'bold',marginBottom: 10 }}>{item.headingname}</div>
                    <ul style={{ listStyleType: 'none', padding: 0 ,color:"#767676",fontSize:12,marginBottom: 10 }}>
                      {item.subheadingname.map((subitem) => (
                        <li style={{ marginBottom:5}}>{subitem}</li>
                      ))}
                    </ul>
                  </Grid>
              ))}
              <Grid item xs={3}>
                <div style={{color:"#666",fontSize:13,fontWeight:'bold',marginBottom: 10 }}>SHOPPING FROM:</div>
                  <div style={{color:"#767676",marginBottom: 10,fontSize:12 }}>You're in <img src={`${serverURL}/static/c0.png`} loading="lazy" style={{width:20, height:20, objectFit: 'cover' }}/>| CHANGE</div>
                <div style={{color:"#767676",marginBottom: 10 ,fontSize:12}}>Some of our international sites:</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',width:'100%',marginBottom: 10 }}>
                {showAllCountryItems()}
                </div>
              </Grid>
            </Grid>
            </div>
          )
      }

      const showAllCountryItems = () => {
        return countryitems.map((item) => (
          <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 5 ,flexWrap:'wrap'}}>
            <img src={`${serverURL}/static/${item.icon}`} loading="lazy" style={{ width:20, height:20, objectFit: 'cover' }} />
          </div>
        ))
      }
      
    
    
    return (
        <div style={{display: 'flex',flexWrap:'wrap',width:'100%'}}>
            <div style={{ display: 'flex', alignItems: 'center' ,width:'100%',height:'100%'}}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',width:'100%',backgroundColor: '#ececec',padding:25}}>
                {showAllBottomItems()}
                </div>
                </div>
        </div>
    )
}