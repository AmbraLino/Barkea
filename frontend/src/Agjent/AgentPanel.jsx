import React, { useState } from "react";
// import "./Agjent.css";

const Agjent = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      klienti: "Sara Hoxha",
      prona: "Apartament 2+1, Tirane",
      data: "09/11/2025",
      ora: "14:00",
      status: "Në pritje",
      mesazh: "",
    },
    {
      id: 2,
      klienti: "Arben Dervishi",
      prona: "Vilë, Durrës",
      data: "10/11/2025",
      ora: "10:30",
      status: "Pranuar",
      mesazh: "",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refuseMsg, setRefuseMsg] = useState("");

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleRefuseClick = (order) => {
    setSelectedOrder(order);
    setShowPopup(true);
  };

  const sendRefusal = () => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, status: "Refuzuar", mesazh: refuseMsg }
          : order
      )
    );
    setRefuseMsg("");
    setShowPopup(false);
  };

  return (
    <div className="agjent-page">
      <h2>Paneli i Agjentit</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Klienti</th>
            <th>Prona</th>
            <th>Data</th>
            <th>Ora</th>
            <th>Statusi</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.klienti}</td>
              <td>{order.prona}</td>
              <td>{order.data}</td>
              <td>{order.ora}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
                >
                  <option>Në pritje</option>
                  <option>Pranuar</option>
                  <option>Refuzuar</option>
                  <option>Përfunduar</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => handleStatusChange(order.id, "Pranuar")}
                  className="btn accept"
                >
                  ✅ Prano
                </button>
                <button
                  onClick={() => handleRefuseClick(order)}
                  className="btn refuse"
                >
                  ❌ Refuzo & Mesazh
                </button>
                <button
                  onClick={() => handleStatusChange(order.id, "Në pritje")}
                  className="btn pending"
                >
                  ⏳ Në pritje
                </button>
                <button
                  onClick={() => handleStatusChange(order.id, "Përfunduar")}
                  className="btn done"
                >
                  🏁 Përfunduar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Shkruaj mesazhin e refuzimit</h3>
            <textarea
              value={refuseMsg}
              onChange={(e) => setRefuseMsg(e.target.value)}
              placeholder="Shkruaj arsyen e refuzimit..."
            />
            <div className="popup-buttons">
              <button onClick={sendRefusal} className="btn confirm">
                Dërgo
              </button>
              <button onClick={() => setShowPopup(false)} className="btn cancel">
                Anulo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agjent;
