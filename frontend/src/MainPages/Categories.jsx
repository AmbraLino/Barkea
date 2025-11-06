import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, Nav, Button, Modal, Form } from "react-bootstrap";
import "./Categories.css";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reserveData, setReserveData] = useState({ date: "", time: "" });

  // Slider çmimi
  const [priceRange, setPriceRange] = useState([0, 9999]);

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

  const filtered = products
    .filter((item) => selectedCategory === "all" || item.category === selectedCategory)
    .filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1]);

  const handleReserve = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
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
      console.log("Gabim gjatë rezervimit:", err.response?.data || err);
    }
  };

  return (
    <>
      {/* Kategori horizontal */}
      <Nav variant="tabs" className="mt-3 justify-content-start">
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

      <Row className="mt-4">
        {/* Slider për çmimin */}
        <Col md={3}>
          <div className="p-3 border rounded shadow-sm bg-light">
            <h6>Filtroni sipas çmimit (€)</h6>
            <label>
              {priceRange[0]}€ - {priceRange[1]}€
            </label>
            <input
              type="range"
              min="0"
              max="9999"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-100 mb-2"
            />
            <input
              type="range"
              min="0"
              max="9999"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-100"
            />
          </div>
        </Col>

        <Col md={9}>
          <Row className="mt-2">
            {filtered.map((item) => (
              <Col md={6} key={item._id} className="mb-4">
                <Card className="h-100 border-0 shadow-sm card-horizontal">
                  {item.photo && (
                    <Card.Img
                      src={`http://localhost:5000/Images/${item.photo}`}
                      className="card-img-left"
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <strong>Çmimi:</strong> {item.price} €
                    </Card.Text>
                    {item.description && (
                      <Card.Text>
                        <strong>Përshkrimi:</strong> {item.description}
                      </Card.Text>
                    )}
                    {item.siperfaqja && (
                      <Card.Text>
                        <strong>Sipërfaqja:</strong> {item.siperfaqja} m²
                      </Card.Text>
                    )}
                    {item.vendndodhja && (
                      <Card.Text>
                        <strong>Vendndodhja:</strong> {item.vendndodhja}
                      </Card.Text>
                    )}
                    <Button
                      className="btn-reserve"
                      onClick={() => setSelectedProduct(item)}
                    >
                      Rezervo me agjent
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Modal për rezervim */}
      {selectedProduct && (
        <Modal show={true} onHide={() => setSelectedProduct(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Rezervo: {selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleReserve}>
              <Form.Group className="mb-3">
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={reserveData.date}
                  onChange={(e) =>
                    setReserveData({ ...reserveData, date: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ora</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={reserveData.time}
                  onChange={(e) =>
                    setReserveData({ ...reserveData, time: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Button type="submit" className="mt-3 btn-reserve">
                Rezervo
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Categories;
