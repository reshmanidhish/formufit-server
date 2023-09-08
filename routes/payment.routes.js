const User = require("../models/User.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.put("/subscribe", isAuthenticated, (req, res) => { // API to make user premium
  const {_id} = req.payload
  
  const updatedForm = {
    isPremium: true
  };

  User.findByIdAndUpdate(_id, updatedForm, { new: true })
  .then((updatedInfo) => {
    if (!updatedInfo) {
      return res.status(404).json({ message: "not found" });
    }
    res.json({ updatedInfo });
  })
  .catch((err) => console.error(err));
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const {subscriptionId} = req.query
    let amount = 0;

    if(subscriptionId==="ebd1d") {
      amount = 1999
    } 
    if(subscriptionId==="89bbf") {
      amount = 22999
    } 
   
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: amount,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
      amount: amount
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;
