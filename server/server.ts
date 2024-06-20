import bodyParser, { json } from "body-parser";
import {
  addFavoriteShoeToUser,
  createNewShoe,
  deleteShoe,
  getAllShoes,
  getFavoriteShoes,
  getOneShoe,
  removeFavoriteShoeFromUser,
} from "./dbFunctions";
import cors from "cors";

const express = require("express");
const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/shoes", async (req, res) => {
  const shoes = await getAllShoes();
  console.log(shoes);
  // send all shoes
  res.json(shoes);
});

app.post("/shoes", (req, res) => {
  // post a new shoe to list
  res.send("new shoe created");
});

app.get("/shoes/:id", async (req, res) => {
  const shoeId = req.params.id;
  const shoe = await getOneShoe(shoeId);
  // send details for one shoe
  res.json(shoe);
});

app.post("/createShoe", async (req, res) => {
  const shoeDetails = req.body.shoe;
  console.log("hello");
  console.log(shoeDetails);
  const newShoe = await createNewShoe(shoeDetails);
  // create a new shoe
  res.send("new shoe created");
});

app.post("/favorites", async (req, res) => {
  const userId = req.body.id;
  const shoes = await getFavoriteShoes(userId);
  // send details for all favorite shoes
  res.json(shoes);
});

app.post("/shoes/:id", (req, res) => {
  // Update details for a specific shoe
  res.send("updated shoe");
});

app.post("/favorite/user/shoe", async (req, res) => {
  const userId = req.body.userId;
  const shoeId = req.body.shoeId;

  await addFavoriteShoeToUser(userId, shoeId);
  // Add shoe as a favorite for the user
  res.send("favorited shoe");
});

app.post("/remove/favorite/user/shoe", async (req, res) => {
  const userId = req.body.userId;
  const shoeId = req.body.shoeId;

  await removeFavoriteShoeFromUser(userId, shoeId);
  // Add shoe as a favorite for the user
  res.send("removed shoe from favorites");
});

app.get("/user/:id", (req, res) => {
  // send details about the user
  // shoes include details about their favorites
  res.send("User details");
});

app.post("/delete/shoe/:id", async (req, res) => {
  const shoeId = req.params.id;
  await deleteShoe(shoeId);
  // Update details for a specific shoe
  res.send("deleted shoe");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
