import React from "react";
import "./Contact.css";

const Contact= () => {
  return (
    <div className="contact-page">
      {/* Get in Touch Section */}
      <div className="contact-info">
        <h2>GET IN TOUCH</h2>
        <p>
          Ultricies nisi voluptatem, illo inventore veritatis et quasi
          architecto vitae dicta sunt explicabo nemo enim voluptas.
        </p>
        <ul>
          <li>
            <span>📧</span>sandeep.talari8999@gmail.com
          </li>
          <li>
            <span>📞</span> 6005782936
          </li>
          <li>
            <span>📍</span> GoldenTower 888a, Sylhet, hyderabad
          </li>
        </ul>
      </div>

      {/* Say Something Form */}
      <div className="contact-form">
        <h2>SAY SOMETHING</h2>
        <form>
          <input type="text" placeholder="Your Name..." />
          <input type="email" placeholder="Your Mail..." />
          <textarea placeholder="Message..." rows="5"></textarea>
          <button type="submit">SEND</button>
        </form>
      </div>

   
      
    </div>
  );
};

export default Contact;
