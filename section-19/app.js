const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const existingRestaurants = JSON.parse(fileData);
  res.render("restaurants", { amountOfRestaurants: existingRestaurants.length, restaurants: existingRestaurants});
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;

  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const existingRestaurants = JSON.parse(fileData);

  existingRestaurants.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(existingRestaurants));

  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000);
