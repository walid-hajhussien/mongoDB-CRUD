// CRUD create read update delete
const mongodb = require("mongodb");
const chalk = require("chalk");

// get the mongoClient method
const MongoClient = mongodb.MongoClient;

// generate ID function
const ObjectID = mongodb.ObjectID;
let id = new ObjectID();

console.log(id);
console.log(id.getTimestamp());

// connection URL
const connectionURL = "mongodb://127.0.0.1:27017";
// db name
const databaseName = "task-manager";

//method
const method = "findAll";

// connect to the database
function connect(connectionURL, databaseName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      connectionURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) {
          console.log(chalk.red("Unable to connect to the database!"));
          reject(err);
        }

        console.log(chalk.green("database connected successfully"));
        resolve(client.db(databaseName));
      }
    );
  });
}

connect(connectionURL, databaseName).then(db => {
  switch (method) {
    case "insertOne":
      addOne(db, "users", { name: "ozil", age: 28 });

      break;
    case "insertMany":
      addMany(db, "users", [{ name: "walid", age: 28 }]);
      break;
    case "findOne":
      findOne(db, "users", { name: "ozil" });
      break;
    case "findAll":
      findAll(db, "users", { name: "walid" });
      break;
  }
  //     insert data to the collection
});

//helpers

// add many collection
function addMany(db, collection, value) {
  return new Promise((resolve, reject) => {
    db.collection(collection)
      .insertMany(value)
      .then(result => {
        console.log(
          chalk.blue(`${result.insertedCount}  document inserted successfully`)
        );
        resolve(result);
      })
      .catch(error => {
        console.log(chalk.red("Unable to insert the data!"));
        reject(error);
      });
  });
}

// add one collection
function addOne(db, collection, value) {
  return new Promise((resolve, reject) => {
    db.collection(collection)
      .insertOne(value)
      .then(result => {
        console.log(
          chalk.blue(`${result.insertedCount}  document inserted successfully`)
        );
        resolve(result);
      })
      .catch(error => {
        console.log(chalk.red("Unable to insert the data!"));
        reject(error);
      });
  });
}

// find one  / EX : query => {name:ozil}
function findOne(db, collection, query) {
  return new Promise((resolve, reject) => {
    db.collection(collection)
      .findOne(query)
      .then(result => {
        if (result) {
          console.log(chalk.blue(`document found successfully`));
        } else {
          console.log(chalk.red(`document not found !`));
        }

        resolve(result);
      })
      .catch(error => {
        console.log(chalk.red("Unable to find the data!"));
        reject(error);
      });
  });
}

// find many /EX : query => {name:ozil}
function findAll(db, collection, query) {
  return new Promise((resolve, reject) => {
    db.collection(collection)
      .find(query)
      .toArray()
      .then(result => {
        if (result.length > 0) {
          console.log(chalk.blue(`documents found successfully`));
        } else {
          console.log(chalk.red(`documents not found !`));
        }
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
}
