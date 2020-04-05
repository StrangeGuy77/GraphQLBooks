const express = require("express");
const graphql = require("express-graphql");
const schema = require("./gql/schema.graphql");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const uri =
  "mongodb+srv://StrangeGuy77:<d0TagyFKOGLGNG4v>@cluster0-zowny.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
});

mongoose.connect("mongodb://localhost/graphqlcourse", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

app.use(
  "/graphql",
  graphql({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("App running on port 4000");
});