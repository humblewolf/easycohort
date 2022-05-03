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

    },

    getCompiledUserValidator: function (){

        const Ajv = require("ajv");
        const validator = new Ajv();
        return validator.compile(require("./user_schema"));

    },

    validateUser: function (compiledUserValidator, user_obj){

        const verdict = compiledUserValidator(user_obj);
        console.log(verdict)
        if(!verdict){
            console.log(compiledUserValidator.errors)
        }

    }

}
