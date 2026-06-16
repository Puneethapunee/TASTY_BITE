const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
    try {
        const order = await Order.create({
            customerName: req.body.customerName,
            email: req.body.email,
            items: req.body.items,
            total: req.body.total,
            createdAt: new Date()
        });

        res.json({ message: "Order placed successfully", order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
