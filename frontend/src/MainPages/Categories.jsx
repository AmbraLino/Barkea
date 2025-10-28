import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, Nav } from "react-bootstrap";
import home1 from "../Images/home1.jpg";
import apt1 from "../Images/apt1.jpg";
import studio1 from "../Images/studio1.jpg";
import dyqan2 from "../Images/dyqan2.jpg";
import vilaPushimi1 from "../Images/vilaPushimi1.jpg";
import garzionere1 from "../Images/garzionere1.jpg";

const Categories = () => {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);

  const staticPhotos = [
    {
      _id: "c1",
      img: home1,
      title: "Vila Moderne",
      description:
        "Dizajn modern, cilësi e lartë dhe hapësira që reflekton stilin tuaj të jetesës.",
      category: "vila",
    },
    {
      _id: "c2",
      img: apt1,
      title: "Apartamente",
      description:
        "Çdo apartament ofron hapësira të ndriçuara, elegante dhe të rehatshme për familjen tuaj.",
      category: "apartamente",
    },
    {
      _id: "c3",
      img: studio1,
      title: "Studio",
      description:
        "Studiot me hapësira të zgjuara, moderne dhe komode, perfekte për profesionistët.",
      category: "studio",
    },
    {
      _id: "c4",
      img: dyqan2,
      title: "Ambiente Komerciale",
      description:
        "Dyqane, butiqe ose ambiente për biznese me qira ose për shitje.",
      category: "dyqan",
    },
    {
      _id: "c5",
      img: vilaPushimi1,
      title: "Vila Pushimi",
      description:
        "Vila pushimi pranë natyrës, perfekte për relaks, larg zhurmës së qytetit.",
      category: "vila",
    },
    {
      _id: "c6",
      img: garzionere1,
      title: "Garsoniere",
      description:
        "Garsoniere moderne dhe funksionale, ideale për jetesë urbane.",
      category: "garsionere",
    },
  ];

  const filteredItems =
    category === "all"
      ? staticPhotos
      : staticPhotos.filter((item) => item.category === category);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/items");
        setProducts(res.data || []);
      } catch (err) {
        console.log("Error fetching products:", err);
        setProducts([]);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      <Nav variant="tabs" className="mt-3">
        <Nav.Item>
          <Nav.Link onClick={() => setCategory("all")}>Të gjitha</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCategory("vila")}>Vila</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCategory("apartamente")}>Apartamente</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCategory("studio")}>Studio</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCategory("dyqan")}>Dyqan</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setCategory("garsionere")}>Garsionere</Nav.Link>
        </Nav.Item>
      </Nav>

      <Row className="mt-4">
        {filteredItems.map((item, i) => (
          <Col md={4} key={i}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Img
                src={item.img}
                style={{ height: 250, objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Categories;
