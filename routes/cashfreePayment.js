const express = require("express");
const  axios  = require("axios");

const router = express.Router();
router.post("/create-order", async (req, res) => {
    try {
        
        const { amount, customerId, customerPhone } = req.body;
        const response = await axios.post(
            "https://api.cashfree.com/pg/orders",
            {
                order_currency: "INR",
                order_amount: amount,
                customer_details: {
                    customer_id: customerId,
                    customer_phone: customerPhone,
                },
                order_meta: {
                    return_url: `https://homentor.in/payment-successful?orderId=${customerId}`,
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-version": "2025-01-01",
                    "x-client-id": process.env.CASHFREE_CLIENT_ID,
                    "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
                },
            }
        );
        console.log(response.data)
        res.status(200).json( response.data );
    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        res.status(500).json({
            message: "Failed to create payment order",
            error: error.response?.data || error.message,
        });
    }
});

module.exports = router