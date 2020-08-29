const express = require("express");
const morgan = require("morgan");
const pug = require("pug");
var pdf = require("html-pdf");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));

app.get("/api/mensagem", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.get("/api/branco", (req, res) => {
  const rendered = pug.renderFile("templates/base.pug", {
    basedir: "templates",
    author: "Timothy",
  });
  pdf.create(rendered).toBuffer((err, buffer) => {
    console.log("This is a buffer:", Buffer.isBuffer(buffer));
    res.writeHead(200, [["Content-Type", "application/pdf"]]);
    res.end(buffer);
  });
});

app.get("/api/branco_html", (req, res) => {
  const rendered = pug.renderFile("templates/base.pug", {
    basedir: "templates",
    author: "Timothy",
  });
  res.send(rendered);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
