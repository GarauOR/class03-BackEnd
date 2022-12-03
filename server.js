"use strict";

const express = require("express");
const superagent = require("superagent");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send("initial URL");
});

app.get("/all_digimon", (req, res) => {
  const url = "https://digimon-api.vercel.app/api/digimon";

  superagent
    .get(url)
    .then((digiData) => {
      const digiList = digiData.body.map((item) => new Digimon(item));
      res.status(200).send(digiList);
    })
    .catch((error) => {
      res.status(500).send(`something went wrong ${error}`);
    });
});

app.get("/ultimate_digimon", (req, res) => {
  const url = "https://digimon-api.vercel.app/api/digimon";

  superagent
    .get(url)
    .then((digiData) => {
      const digiList = digiData.body.map((item) => new Digimon(item));
      const ultimateList = digiList.filter((item) => item.level === "Ultimate");
      res.status(200).send(ultimateList);
    })
    .catch((error) => {
      res.status(500).send(`something went wrong ${error}`);
    });
});

app.get("*", (req, res) => {
  res.status(404).send("not found");
});

class Digimon {
  constructor(info) {
    this.name = info.name;
    this.image = info.image;
    this.level = info.level;
  }
}

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
