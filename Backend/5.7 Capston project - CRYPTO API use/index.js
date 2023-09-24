import express from 'express';
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res)=>{
  try{
    const result = await axios.get('https://api.n.exchange/en/api/v1/get_price/BTCLTC/');
    console.log(result.data);
    res.render('index.ejs', {amount_base: result.data.amount_base, amount_quote: result.data.amount_quote, price: result.data.price, timestamp: result.data.timestamp, type: result.data.type, pair_quote: result.data.quote, pair_base: result.data.pair.base, max_amount_quote: result.data.max_amount_quote, min_amount_quote: result.data.min_amount_quote, max_amount_base: result.data.max_amount_base, min_amount_base: result.data.min_amount_base});
  } catch(error){
    res.status(404).send(error.message);
  }
});


app.get("/", (req, res) => {
  res.render(`index.ejs`);
});

// axios request to api and get bitcoin quotation


// FUNCTIONS: GET BITCOIN QUOTATION to sell and to buy
// STEPS:

// axios to get data from API
// Route to pass data to the front end
// Create a form to get the amount of bitcoin to sell and to buy



app.listen(3000, () => {
  console.log('Server started on port 3000');
});
