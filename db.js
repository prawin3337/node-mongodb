const { MongoClient, ServerApiVersion } = require('mongodb');

let dbConnection;

module.exports = {
    connectToDb: async (cb) => {
        try {
            
            const client = await MongoClient.connect('mongodb://0.0.0.0:27017/bookstore');
            await client.connect();

            // const uri = "mongodb+srv://prawin3337:prawin3337@cluster0.qdgja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
            // const client = new MongoClient(uri, {
            //     serverApi: {
            //         version: ServerApiVersion.v1,
            //         strict: true,
            //         deprecationErrors: true,
            //     }
            // });
            
            // async function run() {
            //     try {
            //         // Connect the client to the server (optional starting in v4.7)
            //         await client.connect();
            //         // Send a ping to confirm a successful connection
            //         await client.db("admin").command({ ping: 1 });
            //         console.log("Pinged your deployment. You successfully connected to MongoDB!");
            //     } finally {
            //         // Ensures that the client will close when you finish/error
            //         await client.close();
            //     }
            // }
            // run().catch(console.dir);
            dbConnection = client.db();
            return cb();
        } catch(err) {
            console.error(err);
            return cb(err);
        }
    },
    getDb: () => dbConnection
}