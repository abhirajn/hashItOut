const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://abhi:pass123@cluster0.euk6yxd.mongodb.net/hashItOut", {
  useNewUrlParser: true,
});

//mongoose schemaa
const alienSchema = {
  name: String,
  age: String,
  nativePlanet: String,
  weight: String,
  height: String,
  language: String,
  email: String,
};

//mongoose model
const Alien = mongoose.model("Alien", alienSchema);

app.post("/create", function (req, res) {
  const newAlien = new Alien({
    name: req.body.name,
    age: req.body.age,
    nativePlanet: req.body.nativePlanet,
    weight: req.body.weight,
    height: req.body.height,
    language: req.body.language,
    email: req.body.email,
  });
  newAlien.save(function (err) {
    if (!err) {
      res.send("succesfully added");
    } else {
      res.send(err);
    }
  });
});

app.patch("/update/:name", function (req, res) {
  Alien.findOneAndUpdate(
    { name: req.params.name },
    { $set: req.body },
    function (err) {
      if (!err) {
        res.send("Successfully updated.");
      } else {
        res.send(err);
      }
    }
  );
});

app.get("/", function (req, res) {
  Alien.find(function (err, result) {
    if (!err) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
});

app.delete("/delete/:name", function (req, res) {
  Alien.deleteOne({ name: req.params.name }, function (err) {
    if (!err) {
      res.send("Successfully deleted the profile.");
    } else {
      res.send(err);
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
