const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");

const userApp = require("./Routes/userRoute");
const contactApp = require("./Routes/contactRoute");
const adminApp = require("./Routes/adminRoute");
const agentApp = require("./Routes/agentRoute");
const productApp = require("./Routes/productRoute");

const app = express();

// ✅ Middleware order matters
app.use(cookieParser()); // Must come before verifyToken (so cookies are readable)

// ✅ Enable CORS and credentials for frontend <-> backend cookie auth
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ✅ Parse JSON body before routes
app.use(express.json());

// ✅ Session setup (optional, if you still use sessions elsewhere)
app.use(
  session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// ✅ Register routes (order doesn’t matter much now)
app.use(contactApp);
app.use(userApp);
app.use(adminApp);
app.use(agentApp);
app.use(productApp);

// ✅ Serve static images
app.use("/images", express.static(path.join(__dirname, "images")));

// ✅ MongoDB connection
mongoose
  .connect(
    "mongodb+srv://deeexh1:Cokollate10@cluster0.0gkrdox.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error:", err));

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
