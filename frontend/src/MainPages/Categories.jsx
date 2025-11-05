import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, Nav } from "react-bootstrap";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/api/items");
        const res = await axios.get("http://localhost:5000/product/reads");
        const items = res.data || [];
        setProducts(items);

        const uniqueCategories = [
          ...new Set(items.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.log("Gabim gjatë marrjes së produkteve:", err);
      }
    };
    fetchProducts();
  }, []);

  const filtered = selectedCategory === "all"
    ? products
    : products.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Nav variant="tabs" className="mt-3">
        <Nav.Item>
          <Nav.Link onClick={() => setSelectedCategory("all")}>Të gjitha</Nav.Link>
        </Nav.Item>

        {categories.map((cat) => (
          <Nav.Item key={cat}>
            <Nav.Link onClick={() => setSelectedCategory(cat)}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)} 
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Produktet */}
      <Row className="mt-4">
        {filtered.map((item) => (
          <Col md={4} key={item._id} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Img
                src={`http://localhost:5000/Images/${item.photo}`}
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

 // src={`http://localhost:5000/images/${item.photo}`} ishte image jo photo dhe images me I te madhe
