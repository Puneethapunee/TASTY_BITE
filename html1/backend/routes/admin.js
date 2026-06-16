const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Contact = require("../models/Contact");

// Middleware: admin only
function isAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) return next();
  return res.status(401).json({ message: "Unauthorized" });
}

// GET ORDERS
router.get("/orders", isAdmin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// GET CONTACT MESSAGES
router.get("/contacts", isAdmin, async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = router;
