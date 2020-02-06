// CRUD create read update delete
const mongodb = require("mongodb");
const chalk = require("chalk");

// get the mongoClient method
const MongoClient = mongodb.MongoClient;
// connection URL
const connectionURL = "mongodb://127.0.0.1:27017";
// db name
const databaseName = "task-manager";

//method
const method = "insertMany";

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

// MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//     if (err) {
//         console.log(chalk.red('Unable to connect to the database!'));
//         return;
//     }

//     console.log(chalk.green('database connected successfully'));
//     const db = client.db(databaseName);

//     insert data to the collection
//     db.collection('users').insertMany([{
//         name: 'walid',
//         age: 28
//     }]).then((result) => {
//         console.log(chalk.blue(`${result.insertedCount}  document inserted successfully`));
//     }).catch((error) => {
//         console.log(chalk.red("Unable to insert the data!"));
//     });

//     db.collection('tasks').insertMany([{
//         description: 'do your job',
//         isCompleted: false
//     }]).then((result) => {
//         console.log(chalk.blue(`${result.insertedCount}  document inserted successfully`));
//     }).catch((error) => {
//         console.log(chalk.red("Unable to insert the data!"));
//     });
// })
