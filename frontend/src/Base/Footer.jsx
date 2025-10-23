import React from "react";
import "./Footer.css";
import { Button } from "react-bootstrap";
import logo from '../Images/barkea_logo_transparent.png';

const Footer = () => {
return(
    <div>
      
      <div className="footer">
        <div className="footer-top">
          <div className="footer-left">
        
            <img src={logo} width="250" height="auto" alt="logo" className="me-2 rounded-circle"  />
                      
            <div className="footer-logo">
              <div className="fb" >
                <i className="fa-brands fa-facebook-f" ></i>
                 <a href="https://www.facebook.com"></a>
              </div>
              <div className="ig">
                <i className="fa-brands fa-instagram"></i>
              </div>
              <div className="tt">
                <i className="fa-brands fa-tiktok"></i>
              </div>
            </div>
          </div>

          <div className="footer-right">
            <div className="company">
              <h3 className="footer-title"> <a href="/" style={{ textDecoration: "none", color: "white" }}>Barkea - Real Estate</a></h3>
                <p>
                <a href="/about" style={{ textDecoration: "none", color: "white" }} className="footer-info">
                  Perreth Nesh
                </a>
              </p>
              {/* <p>Blog</p> */}
              <p>
                <a href="/contact" style={{ textDecoration: "none", color: "white" }} className="footer-info">
                  Kontakti
                </a>
              </p>
            </div>

            <div className="contact">
              <h3 className="footer-title"><a href ="/contact" style={{ textDecoration: "none", color: "white" }}>
                  Informacion rreth Kontaktit
                </a></h3>
              <p className="footer-info">+0123-456-789</p>
              <p className="footer-info">barkea@realestate.com</p>
              <p className="footer-info">Shqipëri</p>
            </div>
          </div>
        </div>

        <div className="footer-line"></div>

        <div className="footer-terms">
          <p className="footer-info">
            Copyright &copy; 2024 - {new Date().getFullYear()} Barkea - Real Estate
          </p>
        </div>
      </div>
      </div>
  );
};
export default Footer;

















