const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
app.use(express.json());

const dburl = "mongodb+srv://iamsomilsharma:2AOywmUhZswLg5vM@cluster0.25hbmqm.mongodb.net/BookMyShow?retryWrites=true&w=majority&appName=Cluster0";

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

mongoose.connect(dburl);
app.listen(8081);