import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './modules/Login';
import Signup from './modules/Signup';
import Checkout from './modules/Checkout';
import Orders from './modules/Orders';
import Home from './modules/Home';
import { Routes, Route } from 'react-router-dom';
import Product from './modules/Product';
import Products from './modules/Products';
import CategoryProducts from './modules/CategoryProducts';
import Cart from './modules/Cart';
import { MyGlobalContext } from './utils/context';
import { getUser } from './utils/utilites';
import supabaseClient from './utils/supabaseClient';
import ReactGA from 'react-ga';

const TRACKING_ID = "G-BRRM44PS00"; 
ReactGA.initialize(TRACKING_ID);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    getUser().then(({data}) => { 
      console.log(data.user);
      setUser(data.user);
      setLoading(false)
    });
  }, [])
  
  useEffect(() => {
    console.log(window.location.pathname + window.location.search)
    ReactGA.pageview(window.location.pathname + window.location.search);

  }, [window.location.search])

  if(loading === true) {
    return null;
  }
  return (
    <MyGlobalContext.Provider value={{ user, setUser }}>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products/:id" element={<Product/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/categories/:name" element={<CategoryProducts/>} />
          <Route path="cart" element={<Cart/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
        <Footer/>
      </div>
    </MyGlobalContext.Provider>
  );
}

export default App;
