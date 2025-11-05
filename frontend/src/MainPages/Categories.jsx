import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, Nav, Button, Modal, Form } from "react-bootstrap";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reserveData, setReserveData] = useState({ date: "", time: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/product/reads");
        const items = res.data || [];
        setProducts(items);

        const uniqueCategories = [...new Set(items.map((item) => item.category))];
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

  const handleReserve = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/order/create",
        {
          productId: selectedProduct._id,
          date: reserveData.date,
          time: reserveData.time
        },
        { withCredentials: true }
      );
      alert("Rezervimi u krijua me sukses!");
      setSelectedProduct(null);
      setReserveData({ date: "", time: "" });
    } catch (err) {
      // console.log("Gabim gjatë rezervimit:", err.response?.data || err);
    }
  };

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
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.price} €</Card.Text>
                <Button onClick={() => setSelectedProduct(item)}>Rezervo me agjent</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal për rezervim */}
      {selectedProduct && (
        <Modal show={true} onHide={() => setSelectedProduct(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Rezervo: {selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleReserve}>
              <Form.Group>
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={reserveData.date}
                  onChange={(e) => setReserveData({ ...reserveData, date: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ora</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={reserveData.time}
                  onChange={(e) => setReserveData({ ...reserveData, time: e.target.value })}
                  required
                />
              </Form.Group>
              <Button type="submit" className="mt-3">Rezervo</Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Categories;
