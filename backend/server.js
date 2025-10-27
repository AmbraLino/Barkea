const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));

// Routes

const contactApp = require("./Routes/contactRoute");
app.use("/", contactApp);
const userRoute = require("./Routes/userRoute");
const adminRoute = require("./Routes/adminRoute");
const agentRoute = require("./Routes/agentRoute");

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/agent", agentRoute);


app.use("/Images", express.static(path.join(__dirname, "Images")));

// MongoDB connection
mongoose.connect(
  "mongodb+srv://deeexh1:Cokollate10@cluster0.0gkrdox.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB connection error:", err));

// kjo duhet sepse backend e merr si path dhe ne frontend nuk konvertohet dot.
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
