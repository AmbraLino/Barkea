import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Auth/UserContext";
import axios from "axios";
import "./UserProfile.css";

const UserProfile = () => {
  const { userInfo, setUserInfo, loading } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    profilePic: ""
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (userInfo) {
      setFormData({
        username: userInfo.username || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        profilePic: userInfo.profilePic || ""
      });
      setPreview(userInfo.profilePic || "");
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:5000/user", formData, {
        withCredentials: true
      });
      setUserInfo(res.data);
      alert("Profili u perditesua!");
    } catch (err) {
      console.error(err);
      alert("Ndoik gabim gjate perditesimit te profilit.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-profile-wrapper">
      {/* Left column - profile */}
      <div className="profile-column">
        <h2>Profili im</h2>
        <form className="user-profile-form" onSubmit={handleSubmit}>
          <div className="profile-picture-wrapper">
            <img
              src={preview || "https://via.placeholder.com/150"}
              alt="Profile"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Nr Telefonit:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <button type="submit">Perditeso profilin</button>
        </form>
      </div>

      <div className="reservations-column">
        <h2>Rezervimet</h2>
        <div className="reservations-placeholder">
         Asnje rezervim ende
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
