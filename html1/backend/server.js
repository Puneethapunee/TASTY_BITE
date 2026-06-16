// ==========================
// 📌 TASTY BITE BACKEND
// ==========================
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

// --------------------------
// MIDDLEWARES
// --------------------------
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: true,
  })
);

// --------------------------
// SERVE FRONTEND FILES
// --------------------------
app.use(express.static(path.join(__dirname, "public")));

// --------------------------
// HOME PAGE → welcome.html
// --------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "welcome.html"));
});

// --------------------------
// MONGODB CONNECT
// --------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// --------------------------
// API ROUTES
// --------------------------
app.use("/api/orders", require("./routes/order"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/admin", require("./routes/admin"));

// --------------------------
// LOGIN — ANY EMAIL + ANY PASSWORD ALLOWED
// --------------------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // 💥 Accept ANY email + ANY password (NO database check)
  req.session.isAdmin = true;
  req.session.email = email;

  return res.json({ success: true, message: "Login successful" });
});

// --------------------------
// LOGOUT
// --------------------------
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: "Logged out" });
});

// --------------------------
// START SERVER
// --------------------------
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
