const { Router } = require('express');
const router = Router();
const cadastro = require('./src/controllers/cadastro');
const login = require('./src/controllers/login')

// Rotas de login
router.get('/login', login.index);
router.post('/logar', login.logar);


// Rotas de cadastro
router.get('/cadastro', cadastro.index )
router.post('/register', cadastro.register);


//rotas da pagina principal

router.get('/index', (req, res) => {
    res.render('index');
})

module.exports = router;
