// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const session = require("express-session");
// const path = require("path");
// const cookieParser = require("cookie-parser");

// const userApp = require ("./Routes/userRoute")
// const contactApp = require("./Routes/contactRoute");
// const adminApp = require("./Routes/adminRoute");
// const agentApp = require("./Routes/agentRoute");
// const productApp = require("./Routes/productRoute");

// const router = express.Router();

// // Middleware
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }));
// app.use(express.json());
// app.use(session({
//     secret: "This will be secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 } 
// }));

// // Routet
// app.use(express.json());
// app.use(cookieParser());

// app.use(contactApp);
// app.use("/user",userApp);
// app.use(adminApp);
// app.use(agentApp);
// app.use(productApp)


// app.use("/Images", express.static(path.join(__dirname, "Images")));

// // MongoDB connection
// mongoose.connect(
//   "mongodb+srv://deeexh1:Cokollate10@cluster0.0gkrdox.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0",
//   { useNewUrlParser: true, useUnifiedTopology: true }
// )
// .then(() => console.log("DB connected"))
// .catch((err) => console.log("DB connection error:", err));

// // kjo duhet sepse backend e merr si path dhe ne frontend nuk konvertohet dot.
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const userApp = require("./Routes/userRoute");
const contactApp = require("./Routes/contactRoute");
const adminApp = require("./Routes/adminRoute");
const agentApp = require("./Routes/agentRoute");
const productApp = require("./Routes/productRoute");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/user", userApp);
app.use("/contact", contactApp);
app.use("/admin", adminApp);
app.use("/agent", agentApp);
app.use("/product", productApp);

app.use("/Images", express.static(path.join(__dirname, "Images")));

mongoose.connect(
  "mongodb+srv://deeexh1:Cokollate10@cluster0.0gkrdox.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB connection error:", err));


app.use(cookieParser()); 
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, 
  })
);

app.use(contactApp);
app.use(userApp);
app.use(adminApp);
app.use(agentApp);
app.use(productApp);

app.use("/images", express.static(path.join(__dirname, "images")));

mongoose
  .connect(
    "mongodb+srv://deeexh1:Cokollate10@cluster0.0gkrdox.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error:", err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
