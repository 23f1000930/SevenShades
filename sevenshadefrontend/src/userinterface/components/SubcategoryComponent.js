import { serverURL } from "../../services/FetchDjangoApiService"
import React from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef, useRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
export default function Subcategory(props) {

    const theme = useTheme();
    const md_matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));

    //or var sldr=createRef()
    const sldr = useRef()
    
    /*var items = [
        { id: '1', subcategoryname: 'SUMMMER LINEN', description: 'Laid-black-looks', icon: '1.jpg' },
        { id: '2', subcategoryname: 'SUNDOWN STYLE', description: 'For your summer nights', icon: '2.jpg' },
        { id: '3', subcategoryname: 'CELEBRATING PRIDE MONTH!', description: "The Artists's Collection", icon: '3.jpg' },
        { id: '4', subcategoryname: 'CARTHARTT WIP', description: 'Streetwear legends', icon: '4.jpg' },
        { id: '5', subcategoryname: 'SUNDOWN STYLE', description: 'For your summer nights', icon: '5.jpeg' },
        { id: '6', subcategoryname: 'CARTHARTT WIP', description: 'Streetwear legends', icon: '6.jpeg' },
        { id: '7', subcategoryname: 'SUMMMER LINEN', description: 'Laid-black-looks', icon: '7.jpeg' },
        { id: '8', subcategoryname: 'SUMMMER LINEN', description: 'Laid-black-looks', icon: '8.jpeg' },
        { id: '9', subcategoryname: 'SUMMMER LINEN', description: 'Laid-black-looks', icon: '9.jpeg' },

        //the key's names should be database fields name's
    ]*/
   var items=props.data

    var settings = {
        dots: true,
        infinite: true,
        
        autoPlay: true,
        autoplaySpeed: 3000,
        slidesToShow: sm_matches?1:md_matches?2:4,
        slidesToScroll: 1,
        arrows: false
    };

    const handleNext = () => {
        sldr.current.slickNext()
    }
    //'current' means sldr's current address 
    const handlePrevious = () => {
        sldr.current.slickPrev()

    }

    const showAllItems = () => {
        return items.map((item) => {
            return (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                <div>
                    <img src={`${serverURL}${item.icon}`} style={{ cursor:'pointer', width:'90%', height:'100%' }} />
                </div>
                <div style={{ cursor:'pointer', fontWeight: 600, fontSize: 22, letterSpacing: 0.5, textAlign:'center' }} >
                    {item.subcategoryname}
                </div>
            </div>)
        })
    }

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <div style={{ cursor: 'pointer', position: 'absolute', left: '-6%', top: '34%', zIndex: 3, }} onClick={handlePrevious}><ArrowBackIosIcon style={{ color: 'grey', fontSize: '6vw' }} /></div>
            <Slider ref={sldr} {...settings}>
                {showAllItems()}
            </Slider>
            <div style={{ cursor: 'pointer', position: 'absolute', right: '-7%', top: '34%', zIndex: 3 }}><ArrowForwardIosIcon style={{ color: 'grey', fontSize: '6vw' }} onClick={handleNext} /></div>
        </div>)
}
//the reference of <Slider> comes in 'sldr' now 'sldr' is a slider
//'vw'(viewport width)--> is used for responsive arrows(6vw===>6% of viewport width)
//'vh' same as 'vw'