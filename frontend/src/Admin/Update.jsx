import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [element, setElement] = useState({
    name: "",
    description: "",
    price: "",
    photo: "",
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const res = await axios.get(`http://localhost:5000/products/findOneProduct/${id}`);
        const res = await axios.get(`http://localhost:5000/product/readOneProduct/${id}`);
        setElement(res.data);
      } catch (err) {
        console.log("Nuk u lexua: " + err);
      }
    };
    fetchProduct();
  }, [id]);


  const handleChange = (e) => {
    setElement({ ...element, [e.target.name]: e.target.value });
  };


  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setElement({ ...element, photo: file });
      setUploadedImage(URL.createObjectURL(file));
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", element.name);
    formData.append("description", element.description);
    formData.append("price", element.price);


    if (element.photo instanceof File) {
      formData.append("photo", element.photo);
    }

    try {
      // await axios.put(`http://localhost:5000/updateProduct/${id}`, formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      await axios.patch(`http://localhost:5000/product/updateProduct/${id}`, 
        formData, { headers: { "Content-Type": "multipart/form-data" }, });
      console.log("Produkti u perditesua");
      navigate("/adminPanel");
    } catch (err) {
      console.log("Produkti nuk u perditesua: " + err);
    }
  };

  return (
    <Container>
      <h1>Perditeso produktin</h1>
      <Form onSubmit={handleUpdate} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="Name">
          <Form.Label>Emri</Form.Label>
          <Form.Control type="text" name="name" value={element.name} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Photo">
          <Form.Label>Foto</Form.Label>
          <Form.Control type="file" name="photo" accept=".jpg, .png, .jpeg" onChange={handleFile}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Price">
          <Form.Label>Cmimi per meter katror</Form.Label>
          <Form.Control type="number" name="price" value={element.price || ""} onChange={handleChange} />
        </Form.Group>

        <Button variant="warning" type="submit">Perditeso </Button>
      </Form>
       
      {uploadedImage ? (
        <img
          src={uploadedImage}
          alt="Uploaded Preview"
          className="img-fluid mt-3"
          style={{ maxWidth: "300px", borderRadius: "10px" }}
        />
      ) : (
        element.photo && (
          <img
            src={`http://localhost:5000/Images/${element.photo}`}
            alt="Current"
            className="img-fluid mt-3"
            style={{ maxWidth: "300px", borderRadius: "10px" }}
          />
        )
      )}
    </Container>
  );
};

export default Update;
