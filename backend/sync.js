const {
    Product,
    Sale_item,
    Sale,
    User
} = require('./model/rel')

const db = require('./db/conn')

async function syncDataBase() {
    try {
        console.log('> sincronizando banco de dados...');
        await db.sync({ force: true })
        console.log('> banco de dados sincronizado.');
    } catch (err) {
        console.error('> ERRO: erro ao sincronizar banco de dados: ', err);
    } finally {
        await db.close()
        console.log('> conexão com o banco de dados encerrada.');
    }
}

syncDataBase()