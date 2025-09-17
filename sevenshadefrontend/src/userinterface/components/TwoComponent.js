import { serverURL } from "../../services/FetchDjangoApiService"
import {useNavigate} from "react-router-dom"
export default function TwoComponent(props) {
    const navigate=useNavigate()
    /*var items=[{id:'1',twocomponentname:'UPGRADED BASICS',description:"It's in the details",icon:'tc1.png',buttondescription:'SHOP NOW'},
    {id:'2',twocomponentname:"TOPMAN",description:'Clean lines only',icon:'tc2.png',buttondescription:'SHOP THE BRAND'}]
    */
    var items = props.mainData[0]
    const handleClick=(item)=>{
        navigate('/productshome',{state:{products:item, pageview:'TwoComponent'}})
         
       }

    const showAllItems = () => {
        return items.map((item) => {
            return <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center', marginRight:40, marginBottom:20 }}>
            <div>
              <img src={`${serverURL}${item.icon}`} loading="lazy" style={{width:450,height:600}}/>
              </div> 
              <div style={{fontWeight:'bold',fontSize:18,letterSpacing:0.8,margin:5}}>
                  {`Trending Fashion for ${item.maincategoryname}` }
              </div>
               <button onClick={()=>handleClick(item)} style={{ color: 'rgb(0, 0, 0)', borderColor: 'rgb(0, 0, 0)', background: 'rgb(255, 255, 255)', dataHoverColor: '#FFFFFF', dataHoverBackground: '#000000',fontWeight:700,fontSize:14,letterSpacing:1,margin:10,padding: '15px 30px', border: '1px solid black',borderBlockWidth:2  }}>
               {`Shop Now`}
              </button>
              </div>

        })
    }
    return (<div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {showAllItems()}
    </div>)
}