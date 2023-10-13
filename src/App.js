// import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Link, Route} from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import {Navbar, Footer, Home, Exchange, Cryptocurrencies, News , Cryptodetails} from './Components'


function App() {
  
  return (
    <div className="App">
      <div className="main-container">
          <Navbar/>

          <Layout>
            <div className="routes">
                <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/exchange' element={<Exchange/>}/>
                  <Route path='/cryptocurrencies' element={<Cryptocurrencies limit={100}/>}/>
                  <Route path='/crypto/:coinId' element={<Cryptodetails/>}/>
                  <Route path='/news' element={<News count={18}/>}/>
                </Routes>
            </div>
          </Layout>  

      </div>
      <div className="footer">
        <Footer/>
      </div>
      
    </div>
  );
}

export default App;
