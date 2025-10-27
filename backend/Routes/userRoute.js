const express = require("express");
const app = express();
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const secret = "asdfe45we45w345wegw345werjktjwertkjfdgfgfsgf";

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

app.post("/register", async (req, res) => {
  const userInfo = req.body;
  try {
    if (
      userInfo.username == " " &&
      (userInfo.email == "") & (userInfo.password == "")
    ) {
      return res.status(404).send("Ju lutem plotesoni te gjitha fushat");
    }
    if (userInfo.password < 5) {
      return res.status(404).send("Fjalekalimi duhet te jete i gjate se paku 6 karaktere");
    }
    let foundUser = await userModel.findOne({ email: userInfo.email }).exec();
    if (foundUser) {
      return res.status(400).send("Perdoruesi me kete email ekziston");
    } else {
      let newUser = new userModel({
        username: userInfo.username,
        email: userInfo.email,
        password: bcrypt.hashSync(userInfo.password, salt),
        role: userInfo.role || "user",
      });
      console.log(newUser);
      await newUser.save();
      return res.status(200).send("Perdoruesi u krijua " + newUser);
    }
  } catch (err) {
    console.log("Dicka shkoi gabim, provoni perseri " + err);
    res.status(500).send("Dicka shkoi gabim " + err);
  }
});

app.post("/login", async (req, res) => {
  const userData = req.body;
  const findUser = await userModel.findOne({ email: userData.email }).exec();
  try {
    if (findUser) {
      const passOk = bcrypt.compareSync(userData.password, findUser.password);

      if (passOk) {
        jwt.sign(
          { email: findUser.email, id: findUser._id, role: findUser.role },
          secret,
          {},
          (err, token) => {
            if (err) {
              console.error("Error ne gjenerimin e token:", err);
              res.status(500).send("Something is wrong");
            } else {
              console.log("Token i gjeneruar:", token);
              res.cookie("token", token, { httpOnly: true }).json({
                id: findUser._id,
                email: findUser.email,
                role: findUser.role,
              });
            }
          }
        );
      } else {
        res.status(400).send("Kredencialet jane gabim");
      }
    } else {
      res.status(404).send("Perdoruesi nuk u gjet");
    }
  } catch (err) {
    res.status(500).send("Dicka shkoi gabim  " + err);
  }
});

app.get("/user", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      console.log("I paautorizuar");
      return res.status(401).send("I pa autorizuar");
    }
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  console.log("U mor kerkesa per logout");

  res.cookie("token", "", { expires: new Date(0), httpOnly: true }).json("ok");
});



module.exports = app;