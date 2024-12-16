import React from 'react'
import "./Footer.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome" 
import {faFacebook ,faInstagram,faLinkedin,faGithub,faTwitter} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-info">
          <h2>SANDEEP</h2>
          <p>
            Aasha icles nisi voluptatem, illo inventore veritatis et quasi
            architecto vitae dicta sunt explicabo.
          </p>
        </div>
        <div className="footer-links">
          <a href="/">HOME</a>
          <a href="/">PORTFOLIO</a>
          <a href="/">SERVICES</a>
          <a href="/">TEAM MEMBER</a>
          <a href="/">CLIENT</a>
          <a href="/">CONTACT</a>
        </div> 
        <div className='icon-container'> 
         <a  className='font-icon'  >
         <FontAwesomeIcon className='font-icon' icon={faLinkedin} /></a>
         <a className='font-icon'>
          <FontAwesomeIcon className='font-icon'  icon={faFacebook} /> </a>
         <a className='font-icon'>
          <FontAwesomeIcon className='font-icon' icon={faInstagram} /></a>
         <a className='font-icon'>
          <FontAwesomeIcon className='font-icon' icon={faGithub} /></a>
         
        
        </div>
      </footer>
    </div>
  )
}

export default Footer
