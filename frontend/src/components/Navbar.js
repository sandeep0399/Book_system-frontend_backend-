import React from 'react'
import { NavLink } from 'react-router-dom';
import  './Navbar.css';
const Navbar = () => {
  return (
    <div>
      <nav className='navbar'> 
        <div className='navbar-container'>
        <a href="/" className="logo">Book SYStem</a>
        <h1 className=''>BooK SYStem</h1>
        <ul className="nav-list-container">
            <NavLink className={"nav-link"} to="/" end>Home</NavLink>
            <NavLink className={"nav-link"} to="/contact">Contacts Us</NavLink>
            <NavLink className={"nav-link"}>About</NavLink>
            <NavLink className={"nav-link"} to="/addbook">Add Books</NavLink>
            
            </ul>
            </div>
      </nav> 
      <hr/>
    </div>
  )
}

export default Navbar
