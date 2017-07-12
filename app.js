const express = require('express');
const ejs = require('ejs');


var app = express();

app.get('/', (req, res) => {
  res.send("landing page");
})

app.listen(8080, () => {
  console.log("server is listening on PORT 8080")
})
