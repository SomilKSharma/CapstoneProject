const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const dburl = "mongodb+srv://iamsomilsharma:2AOywmUhZswLg5vM@cluster0.25hbmqm.mongodb.net/Texxeschool?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dburl);
app.listen(8081);