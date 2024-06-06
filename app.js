const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3001;

const path = require('path');
const routes = require('./routes');
const session = require('express-session');
const flash = require('connect-flash');
const connection = require('./src/database/connection');
const tabelaCadastro = require('./src/database/cadastro');
const {middlewareGlobal} = require('./src/middlewares/middlewares');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

const sessionOptions = session({
    secret: 'akakdfkfnwnfw',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());
app.use(middlewareGlobal);
app.use(routes);


app.listen(port, ()=>{
    console.log('servido rodando em http://localhost:3002 ...');
});
