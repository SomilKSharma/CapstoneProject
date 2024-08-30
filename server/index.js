const express = require('express');
const mongoose = require('mongoose');

const app = express();

const dburl = "mongodb+srv://iamsomilsharma:2AOywmUhZswLg5vM@cluster0.25hbmqm.mongodb.net/Texxeschool?retryWrites=true&w=majority&appName=Cluster0";
app.use(express.json());

mongoose.connect(dburl).then((function () {
  console.log("connected to db");
})).catch(err => console.log(err));

app.listen(8081, () => {
  console.log("server is connected");
}); 