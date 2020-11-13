const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const { PORT, DB_CONNECT } = process.env;
mongoose
  .connect(DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("CONNECTED DATABASE"));

app.use(express.json());

app.listen(PORT || 5000, () => {
  console.log("LISTEN TO PORT ", PORT);
});
