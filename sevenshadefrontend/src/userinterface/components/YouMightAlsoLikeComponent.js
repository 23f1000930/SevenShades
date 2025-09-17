import { serverURL } from "../../services/FetchDjangoApiService"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef,useRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function YouMightAlsoLikeComponent(props)
{
    const theme = useTheme();
    const md_matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));   
    const sldr1 = useRef();

    var you_must_also_like=[{id:'1',icon:'l1.png',price:'£241.00',brand:'Barbour'},
 {id:'2',icon:'l2.png',price:'£229.00',brand:'Barbour'},
 {id:'3',icon:'l3.png',price:'£209.00',brand:'Barbour'},
 {id:'4',icon:'l4.png',price:'£136.00',brand:'Barbour'},
 {id:'5',icon:'l5.png',price:'£136.00',brand:'Barbour'}]

                     var settings = {
                        dots:false,
                        infinite: false,
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        arrows:false
                        
                      };
                       const handleNext1 = () => {
                           sldr1.current.slickNext();
                       };
                   
                       const handlePrevious1 = () => {
                           sldr1.current.slickPrev();
                       };
                   

                       const showYouMustAlsoLike=()=>{
                        return  you_must_also_like.map((item)=>{
                            return <div style={{ display: 'flex', flexDirection: 'column', margin:'1%', flexWrap: 'wrap'}}>
                            <div>
                                <img src={`${serverURL}/static/${item.icon}`} loading="lazy" style={{ width: '100%', height: '100%' }} alt={item.subsubcategoryname} />
                            </div>
                            <div style={{ fontWeight: 800, fontSize:'0.9vw', letterSpacing: 0.5, textAlign: 'left',marginLeft:0 ,color:'black'}}>
                                        {item.price}
                                    </div>
                                    <div style={{ fontSize: '0.8vw', letterSpacing: 0.5, flexDirection: 'column', textAlign:'left', marginTop: '5px' }}>
                                {item.brand}
                            </div>
                        </div>
                    
                        })
                     }

                    return(<div style={{width:'100%',justifyContent: 'center'}}>
    
                    <div style={{display:'flex',flexWrap:'wrap',width:'100%',marginLeft:'20%'}}>
                   
                
                    <div style={{paddingleft:'10%',paddingRight:'10%',display:'flex',flexWrap:'wrap',marginLeft:'10%',marginRight:'10%'}}>
    <div style={{fontWeight:'bold',fontSize:18,letterSpacing:0.8,color:'#2d2d2d',marginTop:20}}>YOU MIGHT ALSO LIKE</div>
    <div style={{display:'flex',flexWrap:'wrap', alignItems: 'center',margin:'5%', justifyContent: 'center',width:'100%',marginTop:20}}>
    <div style={{ width: '100%', justifyContent: 'center' }}>
            <Slider {...settings} ref={sldr1}>
                {showYouMustAlsoLike()}
            </Slider>
        </div>
    </div>
    </div>

                
                               
                    </div>
                    </div>
                    )
}