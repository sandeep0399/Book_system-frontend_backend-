import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Home from "./components/Home";

import AddBook from "./components/Addbook";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditBook from "./components/EditBook";

function App() {
  return (
    <BrowserRouter>
<Navbar/> 
<div style={{ marginTop: '60px' }}>
   <Routes> 
    
    <Route path="/" element={<Home/>}/> 
    <Route path="/addbook" element={<AddBook/>} />
    <Route path="/contact" element={<Contact/>} /> 
    <Route path="/edit-book/:id" element={<EditBook />} />

   </Routes>
   </div> 
   <Footer/>
   </BrowserRouter>
  );
}

export default App;
