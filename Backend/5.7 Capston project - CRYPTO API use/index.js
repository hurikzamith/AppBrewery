import express from 'express';
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', async (req, res)=>{
  try{
    const result = await axios.get('https://api.n.exchange/en/api/v1/get_price/BTCLTC/');
    // console.log(result.data);
    res.render('index.ejs', {amount_base: result.data.amount_base, amount_quote: result.data.amount_quote, price: result.data.price, timestamp: result.data.timestamp, type: result.data.type, pair_quote: result.data.pair.quote, pair_base: result.data.pair.base, max_amount_quote: result.data.max_amount_quote, min_amount_quote: result.data.min_amount_quote, max_amount_base: result.data.max_amount_base, min_amount_base: result.data.min_amount_base});
  } catch(error){
    res.status(404).send(error.message);
  }
});


app.post("/amount", async (req, res) => {
  try {
    const amount_base = req.body.amount;
    console.log(amount_base);
    const response = await axios.get(
      `https://api.n.exchange/en/api/v1/get_price/BTCLTC/?amount_base=${amount_base}`
    );
    console.log(response.data);
    res.render('index.ejs', {amount_base: response.data.amount_base, amount_quote: response.data.amount_quote, price: response.data.price, timestamp: response.data.timestamp, type: response.data.type, pair_quote: response.data.pair.quote, pair_base: response.data.pair.base, max_amount_quote: response.data.max_amount_quote, min_amount_quote: response.data.min_amount_quote, max_amount_base: response.data.max_amount_base, min_amount_base: response.data.min_amount_base});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
