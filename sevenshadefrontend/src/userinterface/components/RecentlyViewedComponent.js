import { serverURL } from "../../services/FetchDjangoApiService"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef,useRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function RecentlyViewedComponent(props)
{
    const theme = useTheme();
    const md_matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));   
    const sldr2 = useRef();

    var recently_viewed=[{id:'1',icon:'rv1.png'},
            {id:'2',icon:'rv2.png'},
            {id:'3',icon:'rv3.png'},
            {id:'4',icon:'rv4.png'},
            {id:'5',icon:'rv5.png'},
            {id:'6',icon:'rv6.png'},
            {id:'7',icon:'rv7.png'}
           ]

                     var settings = {
                        dots:false,
                        infinite: true,
                        
                        autoPlay:true,
                        //autoplaySpeed:3000,
                        slidesToShow: sm_matches?1:md_matches?2:4,
                        slidesToScroll: 1,
                        arrows:false
                        
                      };
                       const handleNext2 = () => {
                           sldr2.current.slickNext();
                       };
                   
                       const handlePrevious2 = () => {
                           sldr2.current.slickPrev();
                       };
                   

                       const showRecentlyViewed=()=>{
                        return  recently_viewed.map((item)=>{
                            return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '5%', flexWrap: 'wrap' }}>
                            <div>
                                <img src={`${serverURL}/static/${item.icon}`} loading="lazy" style={{ width: 150, height: 200 }} alt={item.subsubcategoryname} />
                            </div>
                            
                        </div>
                     }
                    )}

                    return(<div style={{width:'100%',justifyContent: 'center',maxWidth:1200}}>
    
                    <div style={{display:'flex',flexWrap:'wrap',width:'98%'}}>
                   
                
                    <div style={{ width: '90%', position: 'relative' }}>
                    <div style={{ fontWeight: 'bold', fontSize: 18, letterSpacing: 0.8, color: '#2d2d2d', marginTop: 20 }}>RECENTLY VIEWED</div>
                    <div style={{ cursor: 'pointer', position: 'absolute', left: '-8%', top: '45%', zIndex: 3 }} onClick={handlePrevious2}><ArrowBackIosIcon style={{ color: 'grey', fontSize: '2vw' }} /></div>
                    <Slider ref={sldr2} {...settings}>
                        {showRecentlyViewed()}
                    </Slider>
                    <div style={{ cursor: 'pointer', position: 'absolute', right: '-4%', top: '45%', zIndex: 3 }} onClick={handleNext2}><ArrowForwardIosIcon style={{ color: 'grey', fontSize: '2vw' }} /></div>
                </div>

                
                               
                    </div>
                    </div>
                    )
}