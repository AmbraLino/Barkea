import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";

const AgentPanel = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/order/all", { withCredentials: true });
      setOrders(res.data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së rezervimeve:", err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const confirmOrder = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/order/confirm/${id}`, {}, { withCredentials: true });
      fetchOrders(); 
    } catch (err) {
      console.error("Gabim gjatë konfirmimit:", err.response?.data || err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Paneli i Agjentit - Rezervimet</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Produkt</th>
            <th>User</th>
            <th>Data</th>
            <th>Ora</th>
            <th>Status</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.product?.name}</td>
              <td>{order.user?.name}</td>
              <td>{order.date}</td>
              <td>{order.time}</td>
              <td>{order.status}</td>
              <td>
                {order.status === "pending" && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => confirmOrder(order._id)}
                  >
                    Konfirmo
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AgentPanel;
