// Modules
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

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
    res.status(400).send("`word` is not defined");
  }

  const db = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./database.json")),
  );

  if (!db[word]) {
    res.status(204).send("Unknown word");
  }
  res.status(200).json(db[word]);
});

// Post single word
router.get("/api/post", (req, res) => {
  const { word, dialect, ipa, user, note, narrow } = req.query;
  console.log("post:", word, dialect, ipa, user, note, narrow);

  if (!word) {
    res.status(400).send("`word` is not defined");
  }
  if (!dialect) {
    res.status(400).send("`dialect` is not defined");
  }
  if (!ipa) {
    res.status(400).send("`ipa` is not defined");
  }
  if (!user) {
    res.status(400).send("`user` is not defined");
  }

  const db = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./database.json")),
  );

  if (!db[word]) {
    db[word] = {};
  }
  if (!db[word][dialect]) {
    db[word][dialect] = {};
  }
  if (!db[word][dialect][ipa]) {
    db[word][dialect][ipa] = [];
  }

  db[word][dialect][ipa].push({
    time: Date.now(),
    user,
    ...(narrow ? { strict: true } : {}),
    ...(note ? { note } : {}),
  });
  fs.writeFileSync(
    path.join(__dirname, "database.json"),
    JSON.stringify(db, null, 2),
  );

  res.status(200);
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
