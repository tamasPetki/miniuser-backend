const express = require('express');
const app = express();
const sequelize = require('./util/database');
const bodyparser = require('body-parser');
const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/main');
const User = require('./models/user');

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use(authRoutes);
app.use(mainRoutes);

app.use((req,res,next) => {res.status(404).send('<h1>Page not found</h1>')});

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.json({message: message, data: data, status: status});
});

sequelize.sync()
    .then(app.listen(process.env.PORT || 8080))
    .catch(error => console.log(error));
