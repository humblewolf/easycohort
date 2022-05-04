var express = require('express');
var router = express.Router();
var myutils = require('./../utils/myutil')

/* GET users listing. */
router.get('/read', async function(req, res, next) {

  let user_coll = await myutils.getMongodbCollection('user');

  if(!user_coll){
    res.send("some issue while connecting with datastore.");
    return;
  }

  let all_docs = await user_coll.find({}).toArray();

  if(!all_docs){
    res.send("some issue while getting data from datastore.");
    return;
  }

  res.send(all_docs);

});

/* POST users update via upsert. */
router.post('/update', async function(req, res, next) {

  // first validate incoming user document....
  const verdict = myutils.validateUser(req.app.locals.compiledUserValidator, req.body)

  if(!verdict){
    res.send("user schema not correct");
    return;
  }

  let user_coll = await myutils.getMongodbCollection('user');

  if(!user_coll){
    res.send("some issue while connecting with datastore.");
    return;
  }

  let upsert_resp = await user_coll.updateOne(myutils.getUserSelectionClause(req.body), {"$set": req.body}, {upsert: true});

  if(!upsert_resp){
    res.send("some issue while updating in datastore");
    return;
  }

  res.send(upsert_resp.acknowledged);

});


router.post('/test', async function(req, res, next) {
  res.send("hi from test");
});

module.exports = router;
