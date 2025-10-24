import React, { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "react-bootstrap/Carousel";
import Pagination from "react-bootstrap/Pagination";
import home1 from "../Images/home1.jpg";
import home22 from "../Images/home22.jpg";
import home3 from "../Images/home3.jpg";
import apt1 from "../Images/apt1.jpg";
import studio1 from "../Images/studio1.jpg";
import dyqan2 from "../Images/dyqan2.jpg";
import vilaPushimi1 from "../Images/vilaPushimi1.jpg";
import garzionere1 from "../Images/garzionere1.jpg";
import { FaSmile, FaHome, FaWallet, FaMapMarkedAlt } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const houses = [
    {
      img: home1,
      title: "Vila Moderne",
      desc: "Dizajn modern, cilësi e lartë dhe hapësira që reflekton stilin tuaj të jetesës.",
    },
    {
      img: apt1,
      title: "Apartamente",
      desc: "Çdo apartament ofron hapësira të ndriçuara, elegante dhe të rehatshme për familjen tuaj.",
    },
    {
      img: studio1,
      title: "Studio",
      desc: "Studiot me hapësira të zgjuara, moderne dhe komode, perfekte për profesionistët.",
    },
    {
      img: dyqan2,
      title: "Ambiente Komerciale",
      desc: "Dyqane, butiqe ose ambiente për biznese me qira ose për shitje.",
    },
      {
      img: vilaPushimi1,
      title: "Vila Pushimi",
      desc: "Vila pushimi pranë natyrës, perfekte për relaks, larg zhurmës së qytetit.",
    },
      {
      img: garzionere1,
      title: "Garsoniere",
      desc: "Garsoniere moderne dhe funksionale, ideale për jetesë urbane.",
    },
    
  ];

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = houses.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(houses.length / cardsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
          <h2 className="home-h fw-bold">Barkea – Real Estate</h2>
          <h4 className="home-h fw-semibold">
            Ju ofron komoditet, siguri, cilësi dhe elegancë
          </h4>
          <h5 className="home-h">Këtu janë disa nga punët tona</h5>
        </div>

        <div className="home-carousel-container mx-auto shadow-sm rounded overflow-hidden">
          <Carousel fade interval={3000}>
            {[home1, home22, home3].map((img, i) => (
              <Carousel.Item key={i}>
                <img className="d-block w-100 home-carousel-img" src={img} alt={`Slide ${i}`} />
                <Carousel.Caption>
                  <h3 className="home-h fw-semibold fs-4 home-carousel-caption">
                    Arti i Jetesës Moderne
                  </h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>


      <div className="home-section3-text text-center container py-5">
        <h2 className="home-h fw-semibold fs-2 mb-3">
          Këtu mund të gjeni atë çka dëshironi dhe keni ëndërruar.
        </h2>
        <p className="home-p fs-5">
          Investimi i shtëpisë duhet të jetë i mençur dhe i sigurt. Zbuloni
          larmishmërinë e shtëpive tona të dizajnuara për një stil jetese modern dhe të sofistikuar.
        </p>
      </div>


      <div className="home-section4 container py-5 d-flex flex-wrap justify-content-center gap-4">
        {currentCards.map((card, index) => (
          <div
            key={index}
            className="home-house-type card border-0 shadow-sm text-center"
            style={{ width: "22rem" }}
          >
            <img src={card.img} alt={card.title} className="card-img-top home-img" />
            <div className="overlay">Eksploro</div>
            <div className="card-body">
              <h3 className="home-h fw-bold fs-4">{card.title}</h3>
              <p className="home-p fs-6">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </Pagination>
      </div>

      {/*  Features Section */}
      <div className="choose-us">
        <h2>Pse të na zgjidhni ne?</h2>
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
