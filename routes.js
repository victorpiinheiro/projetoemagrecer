const { Router } = require('express');
const router = Router();
const cadastro = require('./src/controllers/cadastro');

// Rotas de login
router.get('/', (req, res) => {
    res.render('login');
});

// Rotas de cadastro
router.get('/cadastro', cadastro.index )
router.post('/register', cadastro.register);

module.exports = router;
