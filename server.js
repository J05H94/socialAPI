const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const { User, Reaction, Thought } = require('./models');

const cwd = process.cwd();
let db;

const connectionStringURI = `mongodb://127.0.0.1:27017/inventoryDB`;

const PORT = process.env.port || 3001;
const app = express();

mongodb.connect(
  connectionStringURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.post('/create', (req, res) => {
  db.collection('bookCollection').insertOne(
    { title: req.body.title, author: req.body.author },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});