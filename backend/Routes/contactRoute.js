const express = require("express");
const ContactModel = require("../Models/contactModel.js");

const app = express();
app.use(express.json()); 
app.post("/contactUs", async (req, res) => {
    try {
        const newContact = new ContactModel(req.body);
        await newContact.save();
        console.log("New contact added:", newContact);
        res.status(200).send(newContact);
    } catch (err) {
        console.log("Not added contact:", err);
        res.status(500).send("Not added");
    }
});

module.exports = app;
