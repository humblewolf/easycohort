var express = require('express');
var router = express.Router();
var myutils = require('./../utils/myutil')

/* GET users listing. */
router.get('/', async function(req, res, next) {

  let all_users = await myutils.getMongodbCollection('user');
  let all_docs = await all_users.find({}).toArray();
  console.log(req.query);

  myutils.validateUser(req.app.locals.compiledUserValidator ,{
    name: 123
  })

  res.send(all_docs);

});

module.exports = router;
