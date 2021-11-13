const express = require("express");
const { Food } = require("../models/index");
const foodRouter = express.Router();

// RESTful Route Delectation

foodRouter.get("/food", getAllItems);
foodRouter.get("/food/:id", getOne);
foodRouter.put("/food", createOne);
foodRouter.put("/food/:id", updateOne);
foodRouter.delete("/food/:id", deleteOne);

async function getAllItems(req, res) {
  const allItems = await Food.findAll();
  res.status(200).json(allItems);
}

async function getOne(req, res) {
  const id = parseInt(req.params.id);
  const oneItem = await Food.findOne({ where: { id: id } });
  res.status(200).json(oneItem);
}

async function createOne(req, res) {
  const obj = req.body;
  const oneItem = await Food.create(obj);
  res.status(201).json(oneItem);
}

async function updateOne(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let foundItem = await Food.findOne({ where: { id } });
  const updatedItem = await foundItem.update(obj);
  res.status(201).json(updatedItem);
}

async function deleteOne(req, res) {
  const id = parseInt(req.params.id);
  const deletedItem = await Food.destroy({ where: { id } });
  res.status(204).json(deletedItem);
}

module.exports = foodRouter;
