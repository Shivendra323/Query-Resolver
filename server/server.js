
const express = require('express')
const {MongoClient} = require('mongodb');
const app = express()
const port = 3000
const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.4';
const client = new MongoClient(url);
const database = 'queryResolver';

async function getData(){
  let result = await client.connect();
  let db = result.db(database);
  let collection = db.collection('User');
  let response = await collection.find({}).toArray();
  console.log(response);

  app.get('/', (req, res) => {
    res.send(response)
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
getData();

