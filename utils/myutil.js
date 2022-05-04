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
        if(!verdict){
            console.log(compiledUserValidator.errors);
        }
        return verdict;

    },

    getUserSelectionClause: function (user_obj) {

        let final_user_selection_clause = [];

        if(user_obj['phone_e164']){
            final_user_selection_clause.push({"phone_e164": user_obj['phone_e164']});
        }

        if(user_obj['email']){
            final_user_selection_clause.push({"email": user_obj['email']});
        }

        return {"$or": final_user_selection_clause};

    }

}
