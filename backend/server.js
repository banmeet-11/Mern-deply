const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

async function startServer() {
  await client.connect();

  const db = client.db("cardApp");
  const cardsCollection = db.collection("cards");

  // Test route
  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  // Login
  app.post("/api/login", (req, res) => {
    const { login, password } = req.body;

    if (login === "test" && password === "123") {
      res.json({ id: 1, firstName: "Test", lastName: "User" });
    } else {
      res.json({ id: -1 });
    }
  });

  // Add Card
  app.post("/api/addcard", async (req, res) => {
    const { card } = req.body;

    await cardsCollection.insertOne({ card });

    res.json({ error: "" });
  });

  // Search Cards
  app.post("/api/searchcards", async (req, res) => {
    const { search } = req.body;

    const results = await cardsCollection
      .find({ card: { $regex: search, $options: "i" } })
      .toArray();

    res.json({
      results: results.map((r) => r.card),
      error: "",
    });
  });

  // Start server
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
}

// Initialize
startServer();