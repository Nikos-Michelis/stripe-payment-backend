const express = require("express");
const app = express();
const { resolve } = require("path");

const stripe = require("stripe")("Your Api Key Here");
app.use(express.static("."));
app.use(express.json());
const calculateOrderAmount = (items) => {
  console.log(items[0].amount);
  return items[0].amount;
};
app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const { currency } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: currency,
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.get("/greet", async (req, res) => {
  res.send("Online... ");
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Node server listening on port ${PORT}"));
