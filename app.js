require('dotenv').config();

const express = require('express');
const session = require('express-session');

const authRoute = require('./routes/authRoute');

const app = express();

app.use(express.json());

app.use(
    session({
        name: 'sid',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 30, // 30분
        },
    })
);

app.use('/auth', authRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
});
