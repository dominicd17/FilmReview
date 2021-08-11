const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://dom:12345@filmreview.rjutk.mongodb.net/FilmReview?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});



app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});



app.use('/build', express.static(path.join(__dirname, '../build')));









app.listen(3000);