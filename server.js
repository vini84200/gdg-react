const express = require("express");
const morgan = require("morgan");
const pug = require("pug");

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
  res.send(rendered);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
