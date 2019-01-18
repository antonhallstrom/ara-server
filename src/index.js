const express = require("express");
const app = express();
const DEFAULT_PORT = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT",
      "POST",
      "PATCH",
      "DELETE",
      "GET"
    );
    return res.status(200).json({});
  }
  next();
});

app.get("/api/v1/posts", (req, res) => {
  res.status(200).json({ message: "yum yum", amount: 0 });
});

app.listen(process.env.PORT || DEFAULT_PORT, () =>
  console.log(`Listening on ${process.env.PORT || DEFAULT_PORT}`)
);
