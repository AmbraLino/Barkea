const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    product: {
        ref: "Product",
        required: true
    },
    user: { 
        ref: "User", 
        required: true 
    },
    agent: { 
        ref: "Agent" ,
        type: String
    },
    date: {
        type: String,
        required: true
    },
    time: { 
        type: String, 
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"], 
        default: "pending" }
}, 
{
     timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
