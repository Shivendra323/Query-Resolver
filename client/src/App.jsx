import React from "react"
import Navbar from "./Componenets/Navigation"
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from "./Componenets/Post";
function App() {
  return (
    <>
      <Navbar/>
      <Post 
        username="John Doe"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        initialComments={['Great post!', 'Interesting content!']}/>
    </>
  )
}

export default App
