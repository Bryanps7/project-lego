const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('project-lego', 'root', 'luna', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

sequelize.authenticate()
.then(()=>{
    console.log('> conexão com o banco de dados estabelecida com sucesso.');
})
.catch((err)=>{
    console.error('> falha ao conectar ao banco de dados: ', err);
});

module.exports = sequelize;