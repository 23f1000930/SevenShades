import { serverURL } from "../../services/FetchDjangoApiService"
import { useComponentStyles } from "./ComponentCss"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef, useRef, useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid } from "@mui/material";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch } from "react-redux";

export default function ProductDetailComponent(props) {
    const [index, setIndex] = useState(0)
    var dispatch=useDispatch()

    try {
        var product = props.productList[index]
        //var product=props.productList[0].icon.split(",")
        console.log("INNNNN PROD1:", product[index])
        var items = product?.icon?.split(",")
    }
    catch (e) {
        var items = [""]
        var product = {}
    }
    const classes = useComponentStyles()

    const theme = useTheme();
    const md_matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));
    const sldr2 = useRef();

    var settings = {
        dots: false,
        infinite: 'false',

        autoPlay: 'false',
        //autoplaySpeed:3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false

    };
    const handleNext2 = () => {
        sldr2.current.slickNext();
    };

    const handlePrevious2 = () => {
        sldr2.current.slickPrev();
    };





    const showAllItems = () => {
        return items?.map((item) => {
            return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', margin: '2px', flexWrap: 'wrap', maxWidth: '300px' }}>
                <div>
                    <img src={`${serverURL}/static/${item}`} loading="lazy" style={{ width: 70, height: 70 }} />
                </div>
            </div>

        })
    }

    const showMainProduct = () => {
        return items?.map((item) => {
            return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '1%', }}>
                <div>
                    <img src={`${serverURL}/static/${item}`} loading="lazy" style={{ width: 500, height: 600, marginLeft: 20, marginRight: 20 }} />
                </div>
            </div>
        })


    }

    const handleChange = (v, product) => {
        // alert(v)
        product['qty'] = v //add new field 'qty' in product dictionary
        if (v >= 1) {
            dispatch({ type: 'ADD_PRODUCT', payload: [product.id, product] })
        }
        else {
            dispatch({ type: 'DELETE_PRODUCT', payload: [product.id] })
        }
        props.setPageRefresh(!props.pageRefresh)

    }

    const showAllDetails = () => {
 
        return <div style={{ display: 'flex', flexDirection: 'column', margin: '2px', flexWrap: 'wrap', maxWidth: '350px' }}>
            <div style={{ color: '#2d2d2d', fontSize: '1.5vw', fontWeight: 'bolder', letterSpacing: 0.6 }}>{product?.productid?.productname}</div>
            <div style={{ color: '#2d2d2d', fontSize: '1vw', fontWeight: 600, letterSpacing: 0.6 }}>{product?.productsubname}</div>
            <div style={{ color: '#666', fontWeight: 'bold', marginTop: 12, fontSize: 18 }}>{product?.offerprice > 0 ?
                <div style={{ width: 150, display: 'flex', justifyContent: 'space-between' }} >
                    <span><s>&#8377;{product?.price}</s></span>
                    <span style={{ color: '#000' }}>&#8377;{product?.offerprice}</span></div> : <span>{product?.price}</span>}</div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ fontWeight: 'bold', marginTop: 12, fontSize: 16, letterSpacing: 0.6 }}>COLOUR:</div>
                <div style={{ marginLeft: 5, marginTop: 12, fontSize: 16, letterSpacing: 0.4 }}>Navy</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ fontWeight: 'bold', marginTop: 12, fontSize: 16, letterSpacing: 0.6, marginRight: 10 }}>SIZE:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <img src={`${serverURL}/static/hanger.png`} loading="lazy" style={{ width: 15, height: 15, objectFit: 'cover', marginTop: 16 }} />
                    <div style={{ marginLeft: 5, marginTop: 18, fontSize: 10, letterSpacing: 0.4, color: '#2d2d2d' }}>Find your Fit Assistent size</div>
                </div>
            </div>
            <div style={{ fontSize: '20', marginTop: 10, width: 250 }}>
                <select style={{ width: '200px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '3px', padding: '5px 15px' }}>
                    <option >Please select</option>
                    <option data_testid="size-0">XS - Chest 36</option>
                    <option data_testid="size-1">S - Chest 38</option>
                    <option data_testid="size-2">M - Chest 40</option>
                    <option data_testid="size-3">L - Chest 42</option>
                    <option data_testid="size-4">XL - Chest 48</option>
                    <option data_testid="size-5">2XL - Chest 50</option>
                </select>
            </div>
            <div style={{ marginTop: '4%' }}>
                <PlusMinusComponent value={0} onChange={(v) => handleChange(v, product)} />
            </div>
            <div style={{ border: '1px solid #ccc', marginTop: 16, paddingBlock: 4, justifyContent: 'column', paddingRight: 10, paddingLeft: 10 }}>
                <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <img src={`${serverURL}/static/deliverytruck.png`} loading="lazy" style={{ width: 25, height: 25, objectFit: 'cover', marginTop: 16 }} />
                        <div style={{ marginTop: 20, fontSize: 14, letterSpacing: 0.6, marginLeft: 5, textAlign: 'right' }}>Free delivery on qualifying orders.</div>
                        <div style={{ marginTop: 5, letterSpacing: 0.6, marginLeft: 30, textAlign: 'right' }}>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '2px' }}>
                                    <li style={{ textDecoration: 'underline', fontSize: 12 }}>View our Delivery & Returns Policy</li>
                                    <img src={`${serverURL}/static/squareicon.png`} loading="lazy" style={{ width: 20, height: 20, marginTop: 2 }} />
                                </div>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div style={{ border: '1px solid #ccc', paddingBlock: 4, justifyContent: 'column', paddingRight: 10, paddingLeft: 10 }}>

                <div style={{ marginTop: 0, fontSize: 10, letterSpacing: 0.6, marginLeft: 5, textAlign: 'left' }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={{ textDecoration: 'underline' }}>This product has shipping restrictions.</li>
                    </ul>

                </div>

            </div>


            <div>
                <ul style={{ listStyleType: 'none' }}>
                    <li>
                        <div>
                            <button className={classes.customButton}>Product Details</button>
                        </div>
                    </li>
                    <li>
                        <button className={classes.customButton}>Brand</button>
                    </li>
                    <li>
                        <button className={classes.customButton}>Size & Fit</button>
                    </li>
                    <li>
                        <button className={classes.customButton}>Look After Me</button>
                    </li>
                    <li>
                        <button className={classes.customButton}>About Me</button>
                    </li>
                </ul>
            </div>
            <div style={{ marginTop: 0, fontSize: 10, letterSpacing: 0.6, marginLeft: 5, textAlign: 'left' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '2px' }}>
                        <li style={{ textDecoration: 'underline', marginTop: 2, fontSize: 12 }}>Report a legal concern</li>
                        <img src={`${serverURL}/static/squareicon.png`} loading="lazy" style={{ width: 20, height: 20, marginTop: 3, marginLeft: -1 }} />
                    </div>
                </ul>

            </div>
        </div>



    }



    return (<div style={{ width: '100%', justifyContent: 'center', marginLeft: -300, maxWidth: 1200 }}>
        <Grid container spacing={0.1} style={{ width: '100%' }}>
            <Grid item xs={12}>

                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '2px', justifyContent: 'center' }}>
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', margin: '2px', marginLeft: -10 }} >
                            {showAllItems()}
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ width: '90%', position: 'relative', maxwidth: 100 }}>
                            <div style={{ cursor: 'pointer', position: 'absolute', left: '2%', top: '45%', zIndex: 3 }} onClick={handlePrevious2}><ArrowBackIosIcon style={{ color: 'grey', fontSize: '2vw' }} /></div>
                            <Slider ref={sldr2} {...settings}>
                                {showMainProduct()}
                            </Slider>
                            <div style={{ cursor: 'pointer', position: 'absolute', right: '10%', top: '45%', zIndex: 3 }} onClick={handleNext2}><ArrowForwardIosIcon style={{ color: 'grey', fontSize: '2vw' }} /></div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'right', margin: '2px' }}>
                            {showAllDetails()}
                        </div>
                    </Grid>
                </div>
            </Grid>
        </Grid>

    </div>
    )
}