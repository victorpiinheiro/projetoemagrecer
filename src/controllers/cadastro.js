const Cadastro = require('../models/cadastro');

exports.index = (req, res) => {
    res.render('cadastro');
}

exports.register = async (req, res) => {
    const usuario = new Cadastro(req.body);

    try {

        await usuario.register();
    if (usuario.errors.length > 0) {
       req.flash('errors', usuario.errors);
       req.session.save(function(){
        return res.redirect('cadastro');
       });
       return;
    }
        
        req.flash('success', 'usuario cadastrado com sucesso');
        req.session.save(()=> {
            res.redirect('back');
        })
        
    } catch (error) {
        console.log('erro as cadastrar usuario', error);
        res.status(500).send('erro ao cadastrar', error)
    }

}