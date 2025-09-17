import { serverURL } from "../../services/FetchDjangoApiService"
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef, useRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
export default function TrendingBrandsComponent(props) {
    const theme = useTheme();
    const md_matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));

    //or var sldr=createRef()
    const sldr = useRef()
    var items = props.data

    var settings = {
        dots: true,
        infinite: true,

        autoPlay: true,
        autoplaySpeed: 3000,
        slidesToShow: sm_matches ? 2 : md_matches ? 4 : 6,
        slidesToScroll: 2,
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
            return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: 40, marginBottom: 20 }}>
                <div>
                    <img src={`${serverURL}${item.icon}`} loading="lazy" style={{ cursor:'pointer', width: 180, height: 180 }} />
                </div>

            </div>

        })
    }


    return (

        <div style={{ width: '84%', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 26, letterSpacing: 1, margin: 5, marginBottom:50 }}>
                TRENDING BRANDS
            </div>
            <div style={{ cursor: 'pointer', position: 'absolute', left: '-5%', top: '45%', zIndex: 3 }} onClick={handlePrevious}><ArrowBackIosIcon style={{ color: 'grey', fontSize: '6vw' }} /></div>
            <Slider ref={sldr} {...settings}>
                {showAllItems()}
            </Slider>
            <div style={{ cursor: 'pointer', position: 'absolute', right: '-5%', top: '45%', zIndex: 3 }}><ArrowForwardIosIcon style={{ color: 'grey', fontSize: '6vw' }} onClick={handleNext} /></div>
        </div>

    )
}
