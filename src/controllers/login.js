const Login = require('../models/login');

exports.index = (req, res) => {
    res.render('login');
}

exports.logar = (req, res) => {
    const login = new Login(req.body);
    login.logar()
}




