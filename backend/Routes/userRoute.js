// const express = require("express");
// const app = express();
// const userModel = require("../Models/userModel");
// const jwt = require("jsonwebtoken");
// const secret = "asdfe45we45w345wegw345werjktjwertkjfdgfgfsgf";

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

// const bcrypt = require("bcrypt");
// const salt = bcrypt.genSaltSync(10);

// app.post("/register", async (req, res) => {
//   const userInfo = req.body;
//   try {
//     if (
//       userInfo.username == " " &&
//       (userInfo.email == "") & (userInfo.password == "")
//     ) {
//       return res.status(404).send("Ju lutem plotesoni te gjitha fushat");
//     }
//     if (userInfo.password < 5) {
//       return res.status(404).send("Fjalekalimi duhet te jete i gjate se paku 6 karaktere");
//     }
//     let foundUser = await userModel.findOne({ email: userInfo.email }).exec();
//     if (foundUser) {
//       return res.status(400).send("Perdoruesi me kete email ekziston");
//     } else {
//       let newUser = new userModel({
//         username: userInfo.username,
//         email: userInfo.email,
//         password: bcrypt.hashSync(userInfo.password, salt),
//         role: userInfo.role || "user",
//       });
//       console.log(newUser);
//       await newUser.save();
//       return res.status(200).send("Perdoruesi u krijua " + newUser);
//     }
//   } catch (err) {
//     console.log("Dicka shkoi gabim, provoni perseri " + err);
//     res.status(500).send("Dicka shkoi gabim " + err);
//   }
// });

// app.post("/login", async (req, res) => {
//   const userData = req.body;
//   const findUser = await userModel.findOne({ email: userData.email }).exec();
//   try {
//     if (findUser) {
//       const passOk = bcrypt.compareSync(userData.password, findUser.password);

//       if (passOk) {
//         jwt.sign(
//           { email: findUser.email, id: findUser._id, role: findUser.role },
//           secret,
//           {},
//           (err, token) => {
//             if (err) {
//               console.error("Error ne gjenerimin e token:", err);
//               res.status(500).send("Something is wrong");
//             } else {
//               console.log("Token i gjeneruar:", token);
//               res.cookie("token", token, { httpOnly: true }).json({
//                 id: findUser._id,
//                 email: findUser.email,
//                 role: findUser.role,
//               });
//             }
//           }
//         );
//       } else {
//         res.status(400).send("Kredencialet jane gabim");
//       }
//     } else {
//       res.status(404).send("Perdoruesi nuk u gjet");
//     }
//   } catch (err) {
//     res.status(500).send("Dicka shkoi gabim  " + err);
//   }
// });

// app.get("/user", (req, res) => {
//   const { token } = req.cookies;
//   jwt.verify(token, secret, {}, (err, info) => {
//     if (err) {
//       console.log("I paautorizuar");
//       return res.status(401).send("I pa autorizuar");
//     }
//     res.json(info);
//   });
// });

// app.post("/logout", (req, res) => {
//   console.log("U mor kerkesa per logout");

//   res.cookie("token", "", { expires: new Date(0), httpOnly: true }).json("ok");
// });
// module.exports = app;



const express = require("express");
const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secret = "asdfe45we45w345wegw345werjktjwertkjfdgfgfsgf";
const salt = bcrypt.genSaltSync(10);

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (!username || !email || !password)
      return res.status(400).send("Plotesoni te gjitha fushat");
    if (password.length < 6)
      return res.status(400).send("Fjalekalimi duhet te kete te pakten 6 karaktere");

    const foundUser = await userModel.findOne({ email });
    if (foundUser)
      return res.status(400).send("Perdoruesi me kete email ekziston");

    const newUser = new userModel({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json({ message: "Perdoruesi u krijua", user: { username, email, role: newUser.role } });
  } catch (err) {
    res.status(500).send("Dicka shkoi gabim: " + err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await userModel.findOne({ email });
    if (!findUser) return res.status(404).send("Perdoruesi nuk u gjet");

    const passOk = bcrypt.compareSync(password, findUser.password);
    if (!passOk) return res.status(400).send("Kredencialet jane gabim");

    const token = jwt.sign({ id: findUser._id, role: findUser.role }, secret);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 dite
      sameSite: "lax",             // per localhost cross-origin
      secure: false,               // sepse localhost nuk ka https
    }).json({ role: findUser.role });
  } catch (err) {
    res.status(500).send("Dicka shkoi gabim: " + err);
  }
});

// GET USER FROM COOKIE
router.get("/", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, secret, {}, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    try {
      const user = await userModel.findById(decoded.id).select("username email role");
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  }).json({ message: "Logged out" });
});

module.exports = router;

