import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3008;

app.use(cors());

app.get("/convert", async (req, res) => {
  const amountTotal = req.query.amount;
  const currencyTotal = req.query.currency;

  const apiKey = process.env.API_KEY;
  const apiUrl = "https://api.api-ninjas.com/v1/exchangerate?pair=SEK_";

  // Make a request to API to fetch the exchange rate for the selected currency
  fetch(`${apiUrl}${currencyTotal}`, {
    headers: {
      "X-Api-Key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Extract exchange_rate from the response
      const rate = data.exchange_rate;

      // Calculate the converted price based on the received rate
      const resultPrice = amountTotal * rate;

      // Construct the response JSON with the converted price
      res.json({ resultPrice });
    })
    .catch((error) => {
      console.log("Request failed", error);
      res.status(500).json({ error: "An error occurred, please try again" });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
