const express = require("express");
const app = express();
const orderModel = require("../Models/orderModel");
const User = require("../Models/userModel");
const { verifyToken, isAgent } = require("../middleware/auth");

// FUNCTION: get the one and only agent in database
const getAgentId = async () => {
  const agent = await User.findOne({ role: "agent" });
  return agent ? agent._id : null;
};

// CREATE ORDER
app.post("/create", verifyToken, async (req, res) => {
  try {
    const { productId, date, time, message } = req.body;

    // find agent automatically
    const agentId = await getAgentId();
    if (!agentId)
      return res.status(500).json({ message: "Nuk u gjet asnje agjent ne sistem." });

    const newOrder = new orderModel({
      product: productId,
      user: req.user ? req.user._id : null,
      agent: agentId,
      date,
      time,
      message: message || ""
    });

    await newOrder.save();
    res.status(200).json(newOrder);

  } catch (err) {
    res.status(500).json({
      message: "Gabim gjatë krijimit të rezervimit",
      error: err.message
    });
  }
});

// GET all orders (agent panel)
app.get("/all", verifyToken, isAgent, async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("product")
      .populate("user")
      .populate("agent");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë marrjes së rezervimeve" });
  }
});

// CONFIRM RESERVATION BY AGENT
app.patch("/confirm/:id", verifyToken, isAgent, async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status: "Pranuar", agent: req.user._id },
      { new: true }
    );

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë konfirmimit të rezervimit" });
  }
});


router.get("/my", verifyToken, async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user.id })
      .populate("product")   
      .populate("agent");     

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading reservations" });
  }
});
router.get("/my", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("product")
      .populate("agent", "username email");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading reservations" });
  }
});


module.exports = app;

