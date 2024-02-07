require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const ejs = require('ejs');

const User = require('./models/User.js');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: false }));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

connectDB();

app.get('/', (req, res) => {
  res.render('index');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.post('/', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
});
