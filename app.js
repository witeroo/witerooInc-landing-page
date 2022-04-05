require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;


// middleware & static files
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});


app.listen(port, () => {
    console.log(`Witeroo app listening on port: ${port}`);
});