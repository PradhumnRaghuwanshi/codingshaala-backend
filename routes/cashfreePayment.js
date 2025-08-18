const express = require("express");
const axios = require("axios");
const { Cashfree, CFEnvironment } = require("cashfree-pg");
const User = require("../models/User");

const cashfree = new Cashfree(CFEnvironment.PRODUCTION, process.env.CASHFREE_CLIENT_ID, process.env.CASHFREE_CLIENT_SECRET);

const router = express.Router();
router.post("/create-order", async (req, res) => {
    try {

        const { amount, customerId, customerPhone } = req.body;
        const response = await axios.post(
            "https://api.cashfree.com/pg/orders",
            {
                order_currency: "INR",
                order_amount: 1,
                customer_details: {
                    customer_id: customerId,
                    customer_phone: customerPhone,
                },
                order_meta: {
                    return_url: `https://codingshaala.com/payment-status?orderId=${customerId}`,
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

        
        const user = await User.findOne({
            phone: customerPhone
        })

        if(!user){
            const newUser = new User(req.body)
            newUser.orderId = response.data.order_id
            await newUser.save()
        } else {
            user.orderId = response.data.order_id
            user.orderId = response.data.order_id
            await user.save()
        }

        console.log(response.data)
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        res.status(500).json({
            message: "Failed to create payment order",
            error: error.response?.data || error.message,
        });
    }
});

router.get('/verify-order/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const response = await cashfree.PGOrderFetchPayments(orderId)
        console.log('Order fetched successfully:', response.data);
        const getOrderResponse = response.data;
        const user = await User.findOne({
            orderId: orderId
        })

        if (
            getOrderResponse.filter(
                (transaction) => transaction.payment_status === "SUCCESS"
            ).length > 0
        ) {
           user.status = "paid"
        }
        

        
        await user.save()

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        res.status(500).json({
            message: "Failed to create payment order",
            error: error.response?.data || error.message,
        });
    }
})

module.exports = router
