module.exports = {

    getMongodbCollection: async function (coll){

        const MongoClient = require('mongodb').MongoClient;

        try {
            const client = await MongoClient.connect('mongodb://localhost:27017/limechat');
            const db = client.db("limechat");
            return await db.collection(coll);
        }catch (err){
            return null;
        }

    }

}
