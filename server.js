const express = require('express');
const routes = require('./routes');
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const { User, Reaction, Thought } = require('./models/index');

const cwd = process.cwd();
let db;

const connectionStringURI = `mongodb://127.0.0.1:27017/socialDB`;

const port = process.env.port || 3001;
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
  db.collection('user').insertOne(
    { username: req.body.username, email: req.body.email, thoughts: req.body.thoughts, friends: req.body.friends },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.post('/create', (req, res) => {
  db.collection('thought').insertOne(
    { thoughtText: req.body.thoughtText, createdAt: req.body.createdAt, username: req.body.username, reactions: req.body.reactions },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.post('/create', (req, res) => {
  db.collection('reaction').insertOne(
    { reactionId: req.body.reactionId, reactionBody: req.body.reactionBody, username: req.body.username, createdAt: req.body.createdAt },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

console.log('server ran')