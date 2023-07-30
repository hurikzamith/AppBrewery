import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render(`index.ejs`);
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.render('index.ejs', { name: req.body['fName'], lname: req.body['lName'] });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
