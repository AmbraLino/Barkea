import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./About.css";
import photo1 from "../Images/about-photo1.jpg";
import photo2 from "../Images/about-photo2.jpg";

const About = () => {
  return (
    <div className="about-container">
      <Container className="py-5">
        <Row className="align-items-center mb-5">
          <Col xs={12} md={7} className="fs-5">
            <h2 className="mb-4 display-4">
              Mirësevini në <b>Barkea</b>
            </h2>
            <p className="mb-4">
              Barkea është më shumë se një kompani real estate – është një
              përvojë që ndërthur estetikën, funksionalitetin dhe stilin e
              jetesës bashkëkohore. Me një prezantim elegant dhe profesional,
              çdo pronë që ne ofrojmë është përzgjedhur me kujdes për të
              reflektuar cilësi, rehati dhe vlera të qëndrueshme.
            </p>
            <p className="mb-4">
              Hapësirat tona – qoftë apartamente urbane moderne apo vila pranë
              natyrës – janë dizajnuar për të krijuar ndjesinë e harmonisë dhe
              për të përfaqësuar mënyrën e jetesës që klientët tanë ëndërrojnë.
            </p>
            <p className="mb-4 fst-italic text-muted">
              "Shtëpia e ëndrrave nis këtu."
            </p>
          </Col>
          <Col xs={12} md={5} className="d-flex justify-content-center">
            <Image src={photo2} className="w-100 h-auto rounded" />
          </Col>
        </Row>

        
          <Row className="my-5 text-center">
            <Col className="fs-5">
              <h3 className="mb-4 display-4">Misioni ynë</h3>
              <p className="mb-4">
                Në Barkea, misioni ynë është të lidhim njerëzit me hapësirat që
                frymëzojnë jetën e tyre. Ne ofrojmë prona që nuk janë thjesht
                vendbanime, por vende ku lindin kujtime, rriten familje dhe
                ndërtohet e ardhmja. Çdo projekt i Barkea mbart pasionin për
                arkitekturë, përkushtimin ndaj detajit dhe respektin për
                cilësinë e jetesës.
              </p>
            </Col>
          </Row>

          <Row className="mb-5 text-center">
            <Col md={6}>
              <h3 className="mb-3 display-6">Cilësi dhe Besueshmëri</h3>
              <p className="mb-4">
                Çdo pronë e Barkea përfaqëson standarde të larta ndërtimi,
                dizajni dhe estetike. Ne bashkëpunojmë me zhvillues dhe
                arkitektë që ndajnë të njëjtat vlera – për të sjellë prona që
                ofrojnë komoditet, siguri dhe elegancë afatgjatë.
              </p>
            </Col>
            <Col md={6}>
              <h3 className="mb-4 display-6">Përvoja e Klientit</h3>
              <p className="mb-4">
                Klientët tanë janë në qendër të çdo vendimi. Ne ofrojmë
                konsulencë të personalizuar, udhëzim të plotë gjatë procesit të
                blerjes apo shitjes, dhe një përvojë të thjeshtë, transparente
                dhe të besueshme.
              </p>
            </Col>
          </Row>


        <Row className="align-items-center mb-5">
          <Col xs={12} md={5} className="d-flex justify-content-center">
            <Image src={photo1} className="w-100 h-auto rounded" />
          </Col>
          <Col xs={12} md={7} className="fs-5 text-end">
            <h3 className="mb-5 display-4">Inovacion dhe Elegancë</h3>
            <p className="mb-4">
              Barkea bashkon traditën e ndërtimit të qëndrueshëm me teknologjinë
              moderne dhe trendet arkitekturore të kohës. Ne besojmë në
              zhvillimin e hapësirave që jo vetëm duken bukur, por edhe ndihen
              si shtëpi – funksionale, efikase dhe të mbushura me dritë
              natyrale.
            </p>
            <p className="mb-4 fst-italic text-muted">
              Barkea është zgjedhja që e bën realitet ëndrrën e shtëpisë.
            </p>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <h3 className="mb-3 display-4">Identiteti i Markës Barkea</h3>
            <p className="mb-4">
              Barkea është simbol i besimit dhe i jetesës me stil. Çdo projekt,
              çdo pronë dhe çdo bashkëpunim reflekton filozofinë tonë: të
              krijojmë hapësira ku njerëzit ndihen vërtet në shtëpinë e tyre.
              Për ata që kërkojnë më shumë se thjesht një pronë – për ata që
              kërkojnë një mënyrë jetese.
            </p>
          </Col>
        </Row>
      </Container>
      </div>
  );
};

export default About;
