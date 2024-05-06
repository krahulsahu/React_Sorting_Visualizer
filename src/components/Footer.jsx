import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
    
      <p>&copy; {new Date().getFullYear()} By  
        <a
          href="https://www.linkedin.com/in/rahul-k-22839a1a1/"
          target="_blank"
          rel="noopener noreferrer"
        >
        _ Rahul Kumar
        </a>
      </p>
    </footer>
  );
};

export default Footer;
