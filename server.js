const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const base64Img = require("base64-img");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.post("/img", (req, res) => {
  console.log(req.body.url);
  console.log(req.body.file);
  var tmp_url = req.body.url;
  var tmp_file = req.body.file;
  base64Img.img(tmp_url, "dest", tmp_file, function(err, path) {
    if (err) {
      console.log(err);
    } else {
      console.log(path);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
