import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
// import './Create.css';

const Create = ({ addCategory }) => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    photo: null,
    price: "",
  });

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });
  const handleFile = (e) => setProduct({ ...product, photo: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.photo || !product.name || product.category || product.price) return alert("Ju duhet te plotesoni te gjitha fushat!");

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("photo", product.photo);

    try {
      const res = await axios.post(
        "http://localhost:5000/addProduct",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      addCategory(res.data);
      setProduct({ name: "", description: "", photo: null, price: "" });
      console.log("Produkti u shtua me sukses");
    } catch (err) {
      console.log("Ndodhi nje gabim produkti nuk u shtua", err.response?.data || err);
    }
  };

  return (
    <Container className="create-container" >
      <h1 className="create-title">Krijo nje produkt </h1>
      <Form className="create-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group controlId="Name">
          <Form.Label>Emri</Form.Label>
          <Form.Control type="text" name="name" value={product.name} onChange={handleChange} />
        </Form.Group>

         <Form.Group controlId="Category">
          <Form.Label>Kategoria</Form.Label>
          <Form.Control type="text" name="name" value={product.category} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="Photo">
          <Form.Label>Foto</Form.Label>
          <Form.Control type="file" name="photo" accept=".jpg,.png,.jpeg" onChange={handleFile}/>
        </Form.Group>

        <Form.Group controlId="Price">
          <Form.Label>Cmimi per meter katror</Form.Label>
          <Form.Control type="text" name="price" value={product.price} onChange={handleChange} />
        </Form.Group>

        <Button type="submit">Shto Produktin</Button>
      </Form>
    </Container>
    
  );
};

export default Create;
