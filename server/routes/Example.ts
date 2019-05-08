import express from "express";

const Example = express.Router();

Example.get("/example", (req, res, next) => {
  res.send("This is an example route.");
});

export default Example;
