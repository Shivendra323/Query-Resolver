import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Componenets/Layout.jsx'
import Post from './Componenets/Post.jsx'
import Login from './Componenets/Login.jsx'
import Search from './Componenets/Search.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Post/>}/>
      <Route path='login' element={<Login />}/>
      <Route path='/search/' element = {<Search data = "hello"/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)