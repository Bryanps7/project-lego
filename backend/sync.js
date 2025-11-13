const { Avatar, User } = require('./model/rel')

const db = require('./db/conn')

async function syncDataBase() {
    try {
        await db.sync({ force: true })
        console.log('> sincronizando banco de dados...');
    } catch (err) {
        console.error('> erro ao sincronizar banco de dados: ', err);
    } finally {
        await db.close()
        console.log('> conexão com o banco de dados encerrada.');
    }
}

syncDataBase()