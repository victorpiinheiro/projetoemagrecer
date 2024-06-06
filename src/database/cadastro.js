const conexao = require('./connection');

const tabelaCadastro = async () => {
    try {
        const conn = await conexao.getConnection();
        const sql = `
                CREATE TABLE IF NOT EXISTS cadastro (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    senha VARCHAR(255) NOT NULL
                    
                )
            `;
    
           await conn.query(sql);

           console.log('tabela "cadastro" criada com sucesso');
        
    } catch (error) {
        console.log('erro ao criar a tabela', error);
    }

}

tabelaCadastro();