import express from 'express';
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let listItems = [];
let listItemsToday = [];
let listItemsWork = [];

function addItemToday(item) {
  listItemsToday.push(item);
}

function addItemWork(item) {
  listItemsWork.push(item);
}

// function playSound() {
//   let audio = new Audio('pop.mp3');
//   audio.play();
// }


// GET ROUTES

app.get('/', (req, res) => {
  res.render('index.ejs', {formattedDate: formattedDate});
});

app.get('/today', (req, res) => {
  res.render('index.ejs', { listItemsToday: listItemsToday, formattedDate: formattedDate });
});

app.get('/work', (req, res) => {
  res.render('index_work.ejs', { listItemsWork: listItemsWork });
});

// POST ROUTES

app.post("/submitToday", (req, res) => {
  addItemToday(req.body['item']);
  res.render('index.ejs', { listItemsToday: listItemsToday });
  console.log('today');
  console.log(listItemsToday);
});

app.post("/submitWork", (req, res) => {
  addItemWork(req.body['item']);
  res.render('index_work.ejs', { listItemsWork: listItemsWork });
  console.log('work');
  console.log(listItemsWork);
});


app.post("/clearToday", (req, res) => {
  listItemsToday = [];
  res.render('index.ejs', { listItemsToday: listItemsToday });
});

app.post("/clearWork", (req, res) => {
  listItemsWork = [];
  res.render('index_work.ejs', { listItemsWork: listItemsWork });
});

// LISTEN

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
