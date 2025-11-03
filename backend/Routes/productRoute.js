const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const productModel = require("../Models/productModel");
const userModel = require("../Models/userModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

//Create me POST
app.post("/addProduct", upload.single("photo"), async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId");
      return res.status(400).send("Invalid userId");
    }

    const user = await userModel.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    if (user.role !== "admin") {
      console.log("Access denied: only admin can create items");
      return res.status(403).send("Access denied: only admin can create items");
    }

    let infoProduct = {
      ...req.body,
      photo: req.file.filename,
      ownerProduct: userId,
    };

    const newProduct = new ProductModel(infoProduct);
    await newProduct.save();
    console.log(newProduct);
    res.status(200).send(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send("Not added product.");
  }
});

//Read all me GET
app.get("/reads", async (req, res) => {
  try {
    const allProduct = await ProductModel.find({});
    console.log(allProduct);
    res.status(200).send(allProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send("Products not read.");
  }
});

//Read one me GET
app.get("/readOneProduct/:id", async (req, res) => {
  try {
    let idProduct = req.params.id;
    const oneProduct = await ProductModel.findById({ _id: idProduct });
    console.log(oneProduct);
    res.status(200).send(oneProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send("Product not read.");
  }
});

//Delete me DELETE
app.delete("/deleteOneProduct/:id", async (req, res) => {
  try {
    let idProduct = req.params.id;
    await productModel.deleteOne({ _id: idProduct });
    console.log("Deleted product.");
    res.status(200).send("Deleted product.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Product not deleted.");
  }
});

//Update
app.patch("/updateProduct/:id", upload.single("photo"), async (req, res) => {
  try {
    let idProduct = req.params.id;
    let infoProduct = { ...req.body };
    if (req.file) {
      infoProduct.photo = req.file.filename;
    }
    const updateProduct = await productModel.findByIdAndUpdate(
      { _id: idProduct },
      { $set: infoProduct },
      { new: true }
    );
    console.log(updateProduct);
    res.status(200).send(updateProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send("Product not updated.");
  }
});

module.exports = app;
