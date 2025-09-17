import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AdminLogin from "./administrator/screens/AdminLogin";
import AdminDashboard from "./administrator/screens/AdminDashboard";
import Home from './userinterface/screens/Home';
import ProductsHome from './userinterface/screens/ProductsHome'
import ProductDetailDisplay from './userinterface/screens/ProductDetailDisplay'
import MyBagDisplay from './userinterface/screens/MyBagDisplay'
import React from "react";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route element={<AdminLogin/>} path={"/adminlogin"}/>
        <Route element={<AdminDashboard/>} path={"/admindashboard/*"}/>
        <Route element={<Home/>} path={"/home"}/>
        <Route element={<ProductsHome/>} path={"/productshome"}/>
        <Route element={<ProductDetailDisplay/>} path={"/productdetaildisplay"}/>
        <Route element={<MyBagDisplay/>} path={"/mybagdisplay"}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
//<Category />
//<DisplayAllCategory />
export default App;