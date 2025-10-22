import React, { useState, useEffect, useContext } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "react-bootstrap/Carousel";
import home1 from "../Images/home1.jpg";
import home22 from "../Images/home22.jpg";
import home3 from "../Images/home3.jpg";
import apt1 from "../Images/apt1.jpg";
import studio1 from "../Images/studio1.jpg";

const Home = () => {
  const [searchFilter, setSearchFilter] = useState("");

  // const filterHome= home.filter(house => house.name.toLowercase().includes(searchFilter.toLowerCase()));
  return (
    <>
      {/* seksioni i pare posht navbarit me filter  */}
      <div className="top">
        <div className="top-text"> Barkea – Arti i Jetesës Moderne</div>
        <div className="top-filter">
          {" "}
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>Kerkoni ketu</span>
        </div>
      </div>

      {/* seksioni i dyte me carousel */}
      <div className="advertisemet">
        <div className="text-adv">
          <h2>Barkea – Real Estate</h2>
          <h4>Ju ofron komoditet, siguri, cilesi dhe elegance</h4>
          <h5>Ketu jane disa nga punet tona</h5>
        </div>

        <div className="carousel-container">
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={home1} alt="First slide" />
              <Carousel.Caption>
                <h3>Arti i Jetesës Moderne</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={home22} alt="First slide" />
              <Carousel.Caption>
                <h3>Arti i Jetesës Moderne</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={home3} alt="First slide" />
              <Carousel.Caption>
                <h3>Arti i Jetesës Moderne</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* seksioni i trete + i katert*/}

      <div className="section3-text">
        <h2>Ketu mund te gjeni ate cka deshironi dhe qe keni enderruar. </h2>
        <p>
          Investimi i shtëpisë duhet të jetë i mençur dhe i sigurt. Zbuloni
          larmishmerine e shtëpive tona të dizajnuara për një stil jetese modern
          dhe të sofistikuar.{" "}
        </p>
      </div>

      <div className="section4">
        <div className="house-type">
          <img src={home1} alt="House Type 1" />
          <h3>Vila Moderne</h3>
          <p>
            Dizajn modern, cilësi e lartë dhe hapësira që reflekton stilin tuaj
            të jetesës.
          </p>
        </div>

        <div className="house-type">
          <img src={apt1} alt="House Type 1" />
          <h3>Apartamente</h3>
          <p>
            Çdo apartament ofron hapësira të ndriçuara, elegante dhe të
            rehatshme për familjen tuaj
          </p>
        </div>

        <div className="house-type">
          <img src={studio1} alt="House Type 1" />
          <h3>Studio</h3>
          <p>
            Studiot me hapësira të zgjuara, moderne dhe komode, perfekte për
            profesionistët
          </p>
        </div>
      </div>

      {/* seksioni i peste last one*/}
      <div className="section5"></div>
    </>
  );
};

export default Home;
