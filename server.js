const Config = require("./config/config.js") ;
const express = require('express');

const app = express();
const Db = require('mongodb').Db;
const Server = require('mongodb').Server;
const MongoClient = require('mongodb').MongoClient;

const Routes = require('./routes.js');


const firstRun = (collections, db, client, callback)=>{
  if(collections.length === 0){
    callback();
    client.close();
    return true;
  }
  console.log("---CREATING COLLECTION: " + collections[0] )
  db.createCollection(collections[0], {
      autoIndexId: true,
      strict: true
  }, function(err, collection) {
     if(err) {
      console.log(collections[0] + " already exists")
     } else{
      console.log(collections[0] + " created")
     }
     arr = collections.slice(0);
     arr.shift();
     firstRun(arr, db, client, callback);
  });
};

//app.use(express.static('public'));

MongoClient.connect(Config.adress, (err, client) => {
  var db = client.db(Config.db);
  firstRun(Config.collections, db, client, function(){
    app.listen(3000, () => {
      Routes(app, db);
      console.log('listening on 3000')
    });
  });
});

module.exports = app;