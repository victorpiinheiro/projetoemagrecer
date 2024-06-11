const Login = require('../models/login');

exports.index = (req, res) => {
    res.render('login');
}

exports.logar = async (req, res) => {
    const login = new Login(req.body);

    try {
        await login.logar();
    
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            console.log(login.errors);
            req.session.save(function(){
                 res.redirect ('login');
            })
            return;
        } 

        req.flash('success', 'Usuario Logado com sucesso');
        req.session.save(function() {
            res.redirect('login')
        })
        return;
        
        
    } catch (error) {
        res.render('404');
        console.log('erro:', error)
    }
}




