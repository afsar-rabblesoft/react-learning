import logo from './logo.svg';
import './App.css';
import Index from './pages/Index';
import Imageform from './pages/Imageform';
import { useEffect, useState } from 'react';
import axios, { isCancel, AxiosError } from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LoginForm } from './pages/login';
import { RegisterForm } from './pages/userpost';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit'

function App() {

  const [items, setItems] = useState([])

  const fetchData = () => {
    axios.get("http://localhost:8000/api/image")
      .then(response => {
        setItems(response.data)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (

    <BrowserRouter>


      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/images' element={<Imageform />} />
        {/* <Index />
      <Imageform /> */}



      </Routes>
    </BrowserRouter>
    

  );
}

export default App;
