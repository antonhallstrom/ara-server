const express = require("express");
const app = express();
const DEFAULT_PORT = 5000;

app.get("/api", (req, res) => {
  res.status(200).json({ message: "yum yum", amount: 0 });
});

app.listen(process.env.PORT || DEFAULT_PORT, () =>
  console.log(`Listening on ${process.env.PORT || DEFAULT_PORT}`)
);
