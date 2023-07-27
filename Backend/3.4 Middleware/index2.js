import express from "express";
import morgan from 'morgan';

const app = express();
const port = 3000;

var logger = app.use(req, res, next) => {
  console.log("Request received:" + req.url);
  conod
}

app.use(morgan('tiny'));

app.get("/", (req, res) => {
  res.send("Hello");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
