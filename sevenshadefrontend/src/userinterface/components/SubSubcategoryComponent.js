import { serverURL } from "../../services/FetchDjangoApiService"
import {useNavigate} from "react-router-dom"
export default function SubSubcategoryComponent(props)
{
   /* var items=[{id:'1',subsubcategoryname:'Calvin Klein Jeans badge logo skater denim jacket in dark wash',price:'£126.50',icon:'ss1.png'},
    {id:'2',subsubcategoryname:"ASOS DESIGN 90s oversized denim shirt with double pockets in orange",price:'£15.50',icon:'ss2.png'},
    {id:'3',subsubcategoryname:'ASOS DESIGN 90s oversized denim western shirt with contrast stitching in',price:'£14.00',icon:'ss3.png'},
    {id:'4',subsubcategoryname:'ASOS DESIGN relaxed denim shirt with panel detailing in acid blue wash',price:'£84.50',icon:'ss4.png'}]*/
    const navigate=useNavigate( )
    var items=props.data
    const handleNextPage=(item)=>{
        navigate('/productdetaildisplay', {state:{productid:item.id}})
    }

    
    const showAllItems=()=>{
        return items?.map((item)=>{
            return <div style={{ cursor:'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '2px', flexWrap: 'wrap', maxWidth: '300px' }} onClick={()=>handleNextPage(item)}>
            <div>
                <img src={`${serverURL}${item.icon}`} loading="lazy" style={{ width: 300, height: 400 }} alt={item.subsubcategoryname} />
            </div>
            <div style={{ fontSize: 16, letterSpacing: 0.5, flexDirection: 'column', textAlign: 'center', marginTop: '5px' }}>
             {item.productname}
            </div>
            <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: 0.5, textAlign: 'left',marginLeft:15 ,color:'#d01345'}}>
                        {//item.price
                         }
                    </div>
        </div>

        })
    }

    var dd=[{id:'1',ddname:'Sort',ddmenu:['Recommended',"What's New",'Price High to Low','Price Low to High']},
    {id:'2',ddname:'Category',ddmenu:['Recommended',"What's New",'Price High to Low','Price Low to High']},
    {id:'3',ddname:'Product Type',ddmenu:['Recommended',"What's New",'Price High to Low','Price Low to High']},
    {id:'4',ddname:'Style',ddmenu:['Recommended',"What's New",'Price High to Low','Price Low to High']},
    {id:'5',ddname:'Brand',ddmenu:['Recommended',"What's New",'Price High to Low','Price Low to High']},
    {id:'6',ddname:'Color',ddmenu:['Recommended',"What's New",'Price High to Low','Price Low to High']},
    {id:'7',ddname:'Bodyfit',ddmenu:['Recommended',"What's New",'Price High to Low','Price Low to High']},
    {id:'8',ddname:'Size',ddmenu:['Recommended',"What's New",'Price High to Low','Price Low to High']},
    {id:'9',ddname:'Price Range',ddmenu:['Recommended',"What's New",'Price High to Low','Price Low to High']}]

const showDropDowns=()=>{
    return dd.map((ddown) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '300px', backgroundColor: '#ececec',flexWrap:'wrap',marginLeft:2,marginRight:2}}>
            <select 
                style={{ width: '200px',fontSize: '16px',color:"#666", backgroundColor: '#ececec', border: '1px solid #ccc', borderRadius: '4px', padding: '6px 10px'}}
            >
            {dd.map(() => (
                <option >{ddown.ddname}</option>
            ))}
        </select>
        </div>
    ));
};
return(<div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:30,letterSpacing:1,margin:20}}>
            New in: {props?.category}
        </div>    
        <div style={{display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap',width:'100%',backgroundColor: '#ececec',padding:10,paddingLeft:120,paddingRight:70}}>
            {showDropDowns()}
            </div>   
        <div style={{display:'flex',flexWrap:'wrap', alignItems: 'center',margin:100, justifyContent: 'space-between',width:'100%'}}>
    {showAllItems()
    }
    </div>
    </div>)


}