import { useState, useEffect } from "react"
import { getData } from "../../services/FetchDjangoApiService"
//components
import Header from "../components/Header"
import SubcategoryComponent from "../components/SubcategoryComponent"
import SliderComponent from "../components/SliderComponent"
import TwoComponent from "../components/TwoComponent"
import TrendingBrandsComponent from "../components/TrendingBrandsComponent"
import Footer from "../components/Footer"
import Bottom from "../components/Bottom"

export default function Home(props) {
    const [listBanner, setListBanner] = useState([])
    const [listSubCategory, setListSubCategory] = useState([])
    const [mainCategoryId, setMainCategoryId] =useState()
    const [listMainCategory, setListMainCategory] = useState([])
    const [listBrand, setListBrand] = useState([])

    const fetchAllBanners = async () => {
        var result = await getData('user_banner_list')
        //alert(JSON.stringify(result))
        var images = result.data.pictures.split(",")
        setListBanner(images)
    }

    const handleListSubCategory = (subCategoryData, mid) => {
        setListSubCategory(subCategoryData);
        setMainCategoryId(mid)
      };
    

      /*useEffect(() => {
        console.log("Updated listSubCategory:", listSubCategory); // This will log the updated value of `main` after the state has been updated
    }, [subCategoryList]); // This effect runs whenever `main` changes*/

    const fetchAllMainCategory = async () => {
        var result = await getData('user_maincategory_list')
        setListMainCategory(result.data)
    }

    const fetchAllBrands = async () => {
        var result = await getData('user_all_brand_list')
        setListBrand(result.data)
    }

    useEffect(function () {
        fetchAllBanners()
        fetchAllMainCategory()
        fetchAllBrands()
    }, [])

    return (<div style={{ position: 'relative', width: '100%' }}>
        <Header onData={handleListSubCategory} />  {/*data in handleListSubCategory comes from Header.js*/}
        <div style={{ width: '99%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginTop: 20, width: '98%', display: 'flex', justifyContent: 'center' }} >
                <SliderComponent images={listBanner} />
            </div>
            <div style={{ marginTop: 30, width: '85%', display: 'flex', justifyContent: 'center' }} >
                <SubcategoryComponent data={listSubCategory} />
            </div>
            <div style={{ margin: 50, width: '100%', display: 'flex', justifyContent: 'center' }}>
                <TwoComponent mainData={[listMainCategory, mainCategoryId]} />
            </div>
            <div style={{marginBottom:50, width: '100%', display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                <TrendingBrandsComponent data={listBrand}/>
            </div>
            <div style={{ borderTop: '1px solid #ececec', height: 20, margin: 0.1 }}></div>
            <div style={{ marginBottom:10, width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Footer />
            </div>
            <div style={{ backgroundColor: '#ececec', width: '100%', display: 'flex', justifyContent: 'space-between', padding: 0, marginLeft: 0, marginRight: 0, }} >
                <Bottom />
            </div>

        </div>
    </div>)
}