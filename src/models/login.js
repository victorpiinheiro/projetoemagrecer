const express = require('express');
const validator = require('validator');
const connection = require('../database/connection');

class Login {
    constructor(body) {
        this.body = body,
        this.errors = [],
        this.usuario = null
    }

    logar(){
        this.valida();

    }

   async valida(){
        this.cleanUp();

        const sql = 'select * from cadastro where email = ? AND senha = ?';
        const [dados] = await connection.execute(sql, [this.body.email, this.body.password]);
       this.usuario = [dados];
       console.log(this.usuario.length);
        
        if (this.usuario < 1) this.errors.push('usuario ou senha invalido');

        console.log(this.errors);

    }

    cleanUp(){
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login;

