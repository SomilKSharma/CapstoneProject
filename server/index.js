const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

const dburl = "mongodb+srv://iamsomilsharma:2AOywmUhZswLg5vM@cluster0.25hbmqm.mongodb.net/BookMyShow?retryWrites=true&w=majority&appName=Cluster0";

app.use('/api/users', userRoutes);

mongoose.connect(dburl);
app.listen(8081);