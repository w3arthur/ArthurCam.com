const path = require('path');
const express = require('express');
const app = express();

app.use(express.urlencoded());


app.use("/", express.static(path.join(__dirname, "data")));  //global public folder

app.post("/auth", function (req, res) {
  /* This server is only available to nginx */
  const streamKey = req.body.key;

  /* You can make a database of users instead :) */
  if (streamKey === "secretKey") {
    res.status(200).send();
    return;
  }

  /* Reject the stream */
  res.status(403).send();
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});