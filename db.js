const {MongoClient} = require('mongodb');

let dbConnection;

module.exports = {
    connectToDb: async (cb) => {
        try {
            const client = await MongoClient.connect('mongodb://0.0.0.0:27017/bookstore');
            dbConnection = client.db();
            return cb();
        } catch(err) {
            console.error(err);
            return cb(err);
        }
    },
    getDb: () => dbConnection
}