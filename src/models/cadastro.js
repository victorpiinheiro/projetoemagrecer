const express = require('express');
const validator = require('validator');
const connection = require('../database/connection');



class Cadastro {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.usuario = null;
    }

   async userExists() {
        const sql = 'select email from cadastro where email = ?';
        const [results] = await connection.execute(sql, [this.body.email]);
        if (results.length > 0) this.errors.push('email ja existente');
    }

    async register () {

        try {
            this.valida();
            if (this.errors.length > 0) return;
            
           await this.userExists();
            if (this.errors.length > 0) return;
            
    
            const sql = 'insert into cadastro (email, senha) values (?, ?)';
            await connection.query(sql, [this.body.email, this.body.password])
            
            const selectSql = 'SELECT * FROM cadastro WHERE email = ?';
            const pegaEmail = await connection.query(selectSql, [this.body.email]);

            this.usuario = pegaEmail[0];
            
        } catch (error) {
            console.log('erro ao cadastrar');
            throw error;
        }

        
    }

    valida() {
        this.cleanUp();

        if (this.body.password.length < 6 || this.body.password.length > 20) {
            this.errors.push('"A senha deve conter entre 6 e 20 caracateres"')
        }
        if (!validator.isEmail(this.body.email)) this.errors.push('"email invalido"');
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

module.exports = Cadastro;

