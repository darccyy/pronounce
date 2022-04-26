// Modules
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Database
const dbUri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.jlwzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const dbClient = new MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dbClient.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to MongoDB");
});

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Access static files
const staticFiles = express.static(path.join(__dirname, "../client/build"));
app.use(staticFiles);

// Start router
const router = express.Router();

// Api test message
router.get("/api/test", (req, res) => {
  res.json({ msg: "This was sent from server. ❤" });
});

// Get single word
router.get("/api/get", (req, res) => {
  const { word } = req.query;
  console.log("get:", word);

  if (!word) {
    res.status(406).send("`word` is not defined");
    return;
  }

  const connect = dbClient.db(word);
  connect.listCollections().toArray(async function (err, names) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    var data = {};
    for (var i in names) {
      const collection = connect.collection(names[i].name);
      data[names[i].name] = await new Promise(resolve => {
        collection.find({}).toArray(function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).send(err);
            return;
          }

          resolve(result);
        });
      });
    }

    res.status(200).json(data);
  });
});

// Post single word
router.get("/api/post", (req, res) => {
  const { word, dialect, ipa, user, note, narrow } = req.query;
  console.log("post:", word, dialect, ipa, user, note, narrow);

  if (!word) {
    res.status(406).send("`word` is not defined");
    return;
  }
  if (!dialect) {
    res.status(406).send("`dialect` is not defined");
    return;
  }
  if (!ipa) {
    res.status(406).send("`ipa` is not defined");
    return;
  }
  if (!user) {
    res.status(406).send("`user` is not defined");
    return;
  }

  const db = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../database/db.json")),
  );

  if (!db[word]) {
    db[word] = {};
  }
  if (!db[word][ipa]) {
    db[word][ipa] = [];
  }

  const collection = dbClient.db(word).collection(ipa);
  collection
    .insertOne({
      time: Date.now(),
      user,
      ...(narrow ? { strict: true } : {}),
      ...(note ? { note } : {}),
    })
    .then(() => {
      res.sendStatus(200);
      console.log(200);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

// Use router
app.use(router);

// any routes not picked up by the server api will be handled by the react router
app.use("/*", staticFiles);

// Start server
app.set("port", process.env.PORT || 3001);
app.listen(app.get("port"), () => {
  console.log(`Listening on ${app.get("port")}`);
});
