import { Button, Form, Toast, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    sms: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.sms
    ) {
      setToastMessage("Ju lutem plotesoni te gjitha fushat.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      return;
    }
    try {
      await axios.post("http://localhost:5000/contactUs", contact);
      setToastMessage(
        "Faleminderit qe na kontaktuat! Ne do ju pergjigjemi brenda 24 oreve."
      );
      setShowToast(true);
      setContact({ firstName: "", lastName: "", email: "", sms: "" });
      setTimeout(() => setShowToast(false), 7000);
    } catch (err) {
      setToastMessage("Dicka shkoi gabim. Ju lutem provoni perseri me vone.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 7000);
    }
  };

  return (
    <div className="contact-container">
      <div className="pt-5 text-center">
        <h3 className="contact-header pt-5 text-center display-6">
          Jeni te interesuar per pronen tuaj te re? Na kontaktoni!
        </h3>
      </div>

      <div className="contact-content">
        <div className="contact-left">
          <h4 className="contact-header pt-5 text-center display-6 text-decoration-underline">
            Vendndodhja jone
          </h4>
          {/* <Map/> */}
        </div>

        <div className="contact-right">
          <h2 className="contact-header pt-5 text-center display-4">Contact Us</h2>

          <Row className="d-flex justify-content-center">
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label className="display-6 text-light">Emri</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={contact.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label className="display-6 text-light">Mbiemri</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={contact.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="display-6 text-light">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="comment">
                  <Form.Label className="display-6 text-light">Mesazhi</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="sms"
                    value={contact.sms}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center my-5">
                  <button
                    className="contact-button px-5 py-2 rounded fw-bold"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </div>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={7000}
        autohide
        style={{
          position: "fixed",
          top: "30px",
          left: "30%",
          right: "70%",
          minWidth: "300px",
          maxWidth: "90%",
          zIndex: 9999,
          fontSize: "1.2rem",
          textAlign: "center",
          backgroundColor: "#DDA15E",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
}

export default Contact;
