const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db; //used as a reference to the database
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("Cluster0");
        console.log("Successfully connected to MongoDB."); 
      }console.log("we went here."); 
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};