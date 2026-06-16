const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// SAVE CONTACT MESSAGE
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        await Contact.create({
            name,
            email,
            message,
            createdAt: new Date()
        });

        res.json({ message: "Message sent successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET ALL CONTACT MESSAGES (SORT BY NEWEST FIRST)
router.get("/", async (req, res) => {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
});

module.exports = router;
