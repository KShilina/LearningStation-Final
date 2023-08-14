import React from "react";
import "./Footer.scss"; // Import your footer styles if you have any

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        123 Demo Street, Toronto ON   | ☎  +1 (647) 000-0000   |   email@learningStation.ca
        <br/>
        © {new Date().getFullYear()} Learning Station. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
