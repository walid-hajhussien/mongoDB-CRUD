// CRUD create read update delete
const mongodb = require('mongodb');
const chalk = require('chalk');




// get the mongoClient method 
const MongoClient = mongodb.MongoClient;
// connection URL
const connectionURL = "mongodb://127.0.0.1:27017";
// db name 
const databaseName = "task-manager";
// connect to the database 
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log(chalk.red('Unable to connect to the database!'));
        return;
    }

    console.log(chalk.green('database connected successfully'));
    const db = client.db(databaseName);

    // insert data to the collection 
    // db.collection('users').insertMany([{
    //     name: 'walid',
    //     age: 28
    // }]).then((result) => {
    //     console.log(chalk.blue(`${result.insertedCount}  document inserted successfully`));
    // }).catch((error) => {
    //     console.log(chalk.red("Unable to insert the data!"));
    // });

    db.collection('tasks').insertMany([{
        description: 'do your job',
        isCompleted: false
    }]).then((result) => {
        console.log(chalk.blue(`${result.insertedCount}  document inserted successfully`));
    }).catch((error) => {
        console.log(chalk.red("Unable to insert the data!"));
    });
})



