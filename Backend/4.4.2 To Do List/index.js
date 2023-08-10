import express from 'express';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let listItems = [];

function addItem(item) {
  listItems.push(item);
}

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post("/submit", (req, res) => {
  addItem(req.body['item']);
  res.render('index.ejs', { listItems: listItems });
  console.log(listItems);
});

app.post("/clear", (req, res) => {
  listItems = [];
  res.render('index.ejs', { listItems: listItems });
});   

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
