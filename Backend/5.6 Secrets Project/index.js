// HINTS:
// 1. Import express and axios
import express from 'express';
import axios from 'axios';

// 2. Create an express app and set the port number.
const app = express();

app.use(express.static("public"));

app.get('/', async (req, res)=>{
  try{
    const result = await axios.get('https://secrets-api.appbrewery.com/random');
    // console.log(result.data['id']);
    res.render('index.ejs', {secret: result.data.secret, user:  result.data.username});
  } catch(error){
    res.status(404).send(error.message);
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
