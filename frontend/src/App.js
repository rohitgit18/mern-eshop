import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategory } from "./redux-config/CategorySlice";
import Product from "./components/Product";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ViewCart from "./components/ViewCart";
import Auth from "./components/Auth";
import axios from "axios";
import Footer from "./components/Foorer";

function App(){
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchCategory());
  },[]);
  return <>
    <Header/>
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/view-cart" element={<Auth><ViewCart/></Auth>}/>
      </Routes>
    </div>
    <Footer/>
  </>
}
export default App;