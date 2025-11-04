import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const Create = ({ addCategory }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    photo: null,
    price: "",
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, photo: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setProduct({ ...product, photo: null });
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.photo || !product.name || !product.category || !product.price) {
      return alert("Plotesoni te gjitha fushat");
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("photo", product.photo);

    try {
      const res = await axios.post(
        "http://localhost:5000/product/addProduct",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setProduct({ name: "", category: "", photo: null, price: "" });
      setPreview(null);
      console.log("Produkti u shtua me sukses:", res.data);
      alert("Produkti u shtua me sukses!");
      navigate("/categories");
    } catch (err) {
      console.log(
        "Ndodhi nje gabim, produkti nuk u shtua:",
        err.response?.data || err
      );
    }
  };

  return (
    <Container
      fluid
      className="create-container d-flex align-items-center justify-content-center"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={9} md={7} lg={5}>
          <Card className="shadow-lg border-0 create-card">
            <Card.Body>
              <h1 className="create-title text-center mb-4">Krijo nje produkt</h1>
              <Form
                className="create-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <Form.Group controlId="Name" className="mb-3">
                  <Form.Label>Emri</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Shkruaj emrin e produktit"
                  />
                </Form.Group>

                <Form.Group controlId="Category" className="mb-3">
                  <Form.Label>Kategoria</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    placeholder="Shkruaj kategorinë"
                  />
                </Form.Group>

                <Form.Group controlId="Photo" className="mb-3">
                  <Form.Label>Foto</Form.Label>
                  <Form.Control
                    type="file"
                    name="photo"
                    accept=".jpg,.png,.jpeg"
                    onChange={handleFile}
                  />
                </Form.Group>

                {preview && (
                  <div className="preview-container mb-4 text-center">
                    <Image
                      src={preview}
                      alt="Preview"
                      className="preview-image"
                      rounded
                    />
                  </div>
                )}

                <Form.Group controlId="Price" className="mb-4">
                  <Form.Label>Cmimi për meter katror</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Vendos cmimin"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" className="create-btn">
                    Shto Produktin
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
