const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const productModel = require("../Models/productModel");
const { verifyToken, isAdmin } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
  destination: (req, file, cb) => cb(null, "images"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  cb(null, allowedFileTypes.includes(file.mimetype));
};

const upload = multer({ storage, fileFilter });

app.post("/addProduct", verifyToken, isAdmin, upload.single("photo"), async (req, res) => {
  try {
    const userId = req.user._id; 

    const newProduct = new productModel({
      ...req.body,
      name: req.body.name,
      // description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      photo: req.file?.filename || null,
      ownerProduct: userId,
    });

    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send("Produkti nuk u shtua.");
  }
});

app.get("/reads", async (req, res) => {
  try {
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Products not read.");
  }
});

app.get("/readOneProduct/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Product not read.");
  }
});

app.delete("/deleteOneProduct/:id", async (req, res) => {
  try {
    await productModel.deleteOne({ _id: req.params.id });
    res.status(200).send("Deleted product.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Product not deleted.");
  }
});

app.patch("/updateProduct/:id", upload.single("photo"), async (req, res) => {
  try {
    const infoProduct = { ...req.body };
    if (req.file) infoProduct.photo = req.file.filename;

    // const updated = await productModel.findByIdAndUpdate(req.params.id, { $set: infoProduct }, { new: true });
    const updated = await productModel.findByIdAndUpdate(
   req.params.id,
   { 
     name: infoProduct.name,
     description: infoProduct.description,
     price: infoProduct.price,
     category: infoProduct.category,
     ...(infoProduct.photo && { photo: infoProduct.photo }) 
   },
   { new: true }
 );
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Produkti nuk u perditesua.");
  }
});

module.exports = app;
