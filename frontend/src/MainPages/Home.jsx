import React, { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "react-bootstrap/Carousel";
import home1 from "../Images/home1.jpg";
import home22 from "../Images/home22.jpg";
import home3 from "../Images/home3.jpg";
import apt1 from "../Images/apt1.jpg";
import studio1 from "../Images/studio1.jpg";
 import { FaSmile, FaHome, FaWallet, FaMapMarkedAlt } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div className="home-container">
      <div className="home-top d-flex flex-column justify-content-center align-items-center text-center py-5">
        <div className="home-top-text fs-1 fw-bold mb-4">
          Barkea – Arti i Jetesës Moderne
        </div>
        <div className="home-top-filter d-inline-flex align-items-center px-4 py-2 rounded-pill">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2 home-icon" />
          <span className="home-filter-text">Kerkoni ketu</span>
        </div>
      </div>

      <div className="home-advertisement text-center py-5">
        <div className="home-text-adv mb-4">
          <h2 className="home-h fw-bold fs-2">Barkea – Real Estate</h2>
          <h4 className="home-h fw-semibold fs-5">
            Ju ofron komoditet, siguri, cilesi dhe elegance
          </h4>
          <h5 className="home-h fs-6">Ketu jane disa nga punet tona</h5>
        </div>

        <div className="home-carousel-container mx-auto shadow-sm rounded overflow-hidden">
          <Carousel fade interval={3000}>
            <Carousel.Item>
              <img className="d-block w-100 home-carousel-img" src={home1} alt="First slide" />
              <Carousel.Caption>
                <h3 className="home-h fw-semibold fs-4 home-carousel-caption">
                  Arti i Jetesës Moderne
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100 home-carousel-img" src={home22} alt="Second slide" />
              <Carousel.Caption>
                <h3 className="home-h fw-semibold fs-4 home-carousel-caption">
                  Arti i Jetesës Moderne
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100 home-carousel-img" src={home3} alt="Third slide" />
              <Carousel.Caption>
                <h3 className="home-h fw-semibold fs-4 home-carousel-caption">
                  Arti i Jetesës Moderne
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      <div className="home-section3-text text-center container py-5">
        <h2 className="home-h fw-semibold fs-2 mb-3">
          Ketu mund te gjeni ate cka deshironi dhe qe keni enderruar.
        </h2>
        <p className="home-p fs-5">
          Investimi i shtëpisë duhet të jetë i mençur dhe i sigurt. Zbuloni
          larmishmerine e shtëpive tona të dizajnuara për një stil jetese modern
          dhe të sofistikuar.
        </p>
      </div>

      <div className="home-section4 container py-5 d-flex flex-wrap justify-content-center gap-4">
        <div className="home-house-type card border-0 shadow-sm text-center" style={{ width: "22rem" }}>
          <img src={home1} alt="House Type 1" className="card-img-top home-img" />
          <div className="card-body">
            <h3 className="home-h fw-bold fs-4">Vila Moderne</h3>
            <p className="home-p fs-6">
              Dizajn modern, cilësi e lartë dhe hapësira që reflekton stilin tuaj të jetesës.
            </p>
          </div>
        </div>

        <div className="home-house-type card border-0 shadow-sm text-center" style={{ width: "22rem" }}>
          <img src={apt1} alt="House Type 2" className="card-img-top home-img" />
          <div className="card-body">
            <h3 className="home-h fw-bold fs-4">Apartamente</h3>
            <p className="home-p fs-6">
              Çdo apartament ofron hapësira të ndriçuara, elegante dhe të rehatshme për familjen tuaj.
            </p>
          </div>
        </div>

        <div className="home-house-type card border-0 shadow-sm text-center" style={{ width: "22rem" }}>
          <img src={studio1} alt="House Type 3" className="card-img-top home-img" />
          <div className="card-body">
            <h3 className="home-h fw-bold fs-4">Studio</h3>
            <p className="home-p fs-6">
              Studiot me hapësira të zgjuara, moderne dhe komode, perfekte për profesionistët.
            </p>
          </div>
        </div>
      </div>

      <div className="home-section5"></div>


     {/* Features */}
     <div className="choose-us">
             <h2>Why Choose Us</h2>
             <p className="choose-subtitle">Ne ofrojmë përvojë të plotë në çdo hap.</p>
     
             <div className="choose-grid">
               <div className="choose-card">
                 <FaSmile className="choose-icon" />
                 <h4>Të besuar nga mijëra</h4>
                 <p>Me mbi 1,000 klientë të kënaqur, ju jeni në duar të sigurta.</p>
               </div>
     
               <div className="choose-card">
                 <FaHome className="choose-icon" />
                 <h4>Gamë e gjerë pronash</h4>
                 <p>Një gamë e gjerë pronash për çdo nevojë dhe buxhet.</p>
               </div>
     
               <div className="choose-card">
                 <FaWallet className="choose-icon" />
                 <h4>Financim i thjeshtë</h4>
                 <p>Proces i lehtë dhe transparent financimi për klientët tanë.</p>
               </div>
     
               <div className="choose-card">
                 <FaMapMarkedAlt className="choose-icon" />
                 <h4>Shiko lagjet</h4>
                 <p>Eksploroni lagjet më të mira përpara se të zgjidhni.</p>
               </div>
             </div>
           </div>

    </div>
  );
};

export default Home;
