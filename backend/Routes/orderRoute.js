const express = require("express");
const app = express();
const path = require("path");
const orderModel = require("../Models/orderModel");
const { verifyToken, isAgent, isUser } = require("../middleware/auth");

app.post("/create", verifyToken, async (req, res) => {
  try {
    const { productId, date, time } = req.body;
    const newOrder = new orderModel({
      product: productId,
      user: req.user._id,
      date,
      time
    });
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë krijimit të rezervimit", error: err.message });
  }
});

app.get("/all", verifyToken, isAgent, async (req, res) => {
  try {
    const orders = await orderModel.find().populate("product").populate("user");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë marrjes së rezervimeve" });
  }
});

app.patch("/confirm/:id", verifyToken, isAgent, async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed", agent: req.user._id },
      { new: true }
    );
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë konfirmimit të rezervimit" });
  }
});

module.exports = app;
