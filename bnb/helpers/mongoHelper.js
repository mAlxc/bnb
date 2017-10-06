/*//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
function initMongoose(){
var mongoDB = 'mongodb://bnb_admin:123456m@ds147534.mlab.com:47534/bnb';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
global.db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

}*/
var MongoClient = require("mongodb").MongoClient;
var database = null
var url = 'mongodb://bnb_admin:123456m@ds147534.mlab.com:47534/bnb'

function getCollection(collectionname) {
  MongoClient.connect(url, function (error, db) {
    if (error) {
      console.log(error)
    } else {
      //db.getCollection(collectionname);
      console.log("Connecté à la base de données 'tutoriel'");
      var collection = db.collection(collectionname)
      console.log(collection)
    }

  });

}

function insertIn(collectionname, data) {
  MongoClient.connect(url, function (error, db) {
    if (error) {
      console.log(error)
    } else {
      //db.getCollection(collectionname);
      console.log("Connecté à la base de données 'tutoriel'");
      var collection = db.collection(collectionname)
      collection.insert(data, null, function (error, results) {
        if (error) throw error;

        console.log("Le document a bien été inséré");
      });
    }

  });

}

exports.getCollection = getCollection;
exports.insertIn = insertIn;