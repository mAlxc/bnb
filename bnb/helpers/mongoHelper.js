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
var url = 'mongodb://bnb_admin:123456m@ds147534.mlab.com:47534/bnb'

/**
 * @function initmongo fonction d'initialisation de mongoDb
 */
function initMongo() {
  MongoClient.connect(url, function (error, db) {
    if (error) {
      console.log(error)
    } else {
      //db.getCollection(collectionname);
      console.log("Connecté à la base de données",db.databaseName);
      appVars.db = db;
    }

  });
}

/**
 * 
 * @param {*} collectionname 
 * @param {*} data 
 * @param {*} res 
 */
function insertIn(collectionname, data,res) {
  if (appVars.db) {
    collection = appVars.db.collection(collectionname)
    collection.insert(data, null, function (error, results) {
      if (error) throw error;
      res.send({
        sucess:{
          suc_code : 200,
          suc_msg:"La ligne ete ajouter dans "+collectionname,
          suc_data : results
        }
      })
    });
  }else{
    res.status(500)
    res.end()
  }
}

/**
 * 
 * @param {*} collectionname 
 * @param {*} callback 
 * @param {*} res 
 */
function getCollToArray(collectionname,callback,res){
  appVars.db.collection(collectionname).find().toArray(function (error, results) {
    if (error){
      
    }else{
      if(callback===null){
        res.send(results);
      }else{
        callback(results)
      }
    }
});
}

function findInWithParamsToArray(collectionname,params,callback,res){
  appVars.db.collection(collectionname).find(params).toArray(function (error, results) {
    if (error){
    }else{
      if(callback===null){
        res.send(results);
      }else{
        callback(results)
      }
    }
});
}

function findOnewithParams(collectionname,params,callback,res){
  appVars.db.collection(collectionname).findOne(params,function (error, results) {
    if (error){
    }else{
      if(callback===null){
        res.send(results);
      }else{
        callback(results)
      }
    }})
  }


exports.initMongo = initMongo;
exports.insertIn = insertIn;
exports.getCollToArray = getCollToArray;
exports.findInWithParamsToArray = findInWithParamsToArray;
exports.findOnewithParams = findOnewithParams;