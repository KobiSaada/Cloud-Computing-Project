/*
To run the server with the client side run 'npm run dev'
To kill the server with the client side run 'npm run kill'
*/



const express = require('express');
const cors = require('cors');
const Connection = require('mysql/lib/Connection');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
app.use(cors())

//Init Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/products', require('./routes/api/products'));


const PORT = process.env.PORT || 5002;
app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`)
});



//install dependencies
//npm i express express-validator bcrypt.js config gravatar jsonwebtoken request mysql
//not installed mongose
//install dev-tools
//npm i -D nodemon concurrently

//installl client
//npm i axios react-router-dom uuid redux react-redux redux-thunk redux-devtools-extension moment react-moment