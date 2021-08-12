const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const userController = require('./userController')


mongoose.connect('mongodb+srv://dom:12345@filmreview.rjutk.mongodb.net/FilmReview?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use('/build', express.static(path.join(__dirname, '../build')));


const userRouter = express.Router();
app.use('/user', userRouter);

userRouter.post('/', userController.createUser);

userRouter.post('/login', userController.loginUser);

userRouter.post('/save', userController.updateUser, (req, res) => {
  return res.status(200).send(res.locals.updatedUser)
} )










app.listen(3000);