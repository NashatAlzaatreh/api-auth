const express = require("express");
const { Clothes } = require("../models/index");
const clothesRouter = express.Router();

// RESTful Route Delectation

clothesRouter.get("/clothes", getAllItems);
clothesRouter.get("/clothes/:id", getOne);
clothesRouter.put("/clothes", createOne);
clothesRouter.put("/clothes/:id", updateOne);
clothesRouter.delete("/clothes/:id", deleteOne);

async function getAllItems(req, res) {
  const allItems = await Clothes.findAll();
  res.status(200).json(allItems);
}

async function getOne(req, res) {
  const id = parseInt(req.params.id);
  const oneItem = await Clothes.findOne({ where: { id: id } });
  res.status(200).json(oneItem);
}

async function createOne(req, res) {
  const obj = req.body;
  const oneItem = await Clothes.create(obj);
  res.status(201).json(oneItem);
}

async function updateOne(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let foundItem = await Clothes.findOne({ where: { id } });
  const updatedItem = await foundItem.update(obj);
  res.status(201).json(updatedItem);
}

async function deleteOne(req, res) {
  const id = parseInt(req.params.id);
  const deletedItem = await Clothes.destroy({ where: { id } });
  res.status(204).json(deletedItem);
}

module.exports = clothesRouter;
