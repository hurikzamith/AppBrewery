import express from 'express'
import morgan from 'morgan'
import ejs from 'ejs'

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
