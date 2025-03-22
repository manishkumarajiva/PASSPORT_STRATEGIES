require('dotenv').config();
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const passport = require('./passport/passport.js');;
const bodyParser = require('body-parser');
const DBconnect = require('./DBconnect.js');
const expressSession = require('express-session');
const IndexRoutes = require('./routes/auth.routes.js');


const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));


// app.use(cors({
//     origin : 'http://localhost:5173/',
//     methods : ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     credentials : true,
//     allowedHeaders : ['Content-Type', 'Authorization', 'X-Origin'],
//     preflightContinue : false,
//     optionsSuccessStatus : 204
// }))

app.use(cors('*'))


app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie : { maxAge : 1 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send("<h1> Server is Listening </h1>")
})



app.use('/api/auth', IndexRoutes);

const HttpServer = http.createServer(app);
HttpServer.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));

