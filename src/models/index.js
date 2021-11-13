"use strict";

require("dotenv").config();
const NODE_ENV = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL;
// Connects to our database depending on the URI as an environmental variable
const POSTGRES_URI = NODE_ENV === "test" ? "sqlite:memory:" : DATABASE_URL;

// require both the Sequelize and Datatype  constructor from the sequelize package

const { Sequelize, DataTypes } = require("sequelize");

// We will configure our connection options for production

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

// our connection object
// we are going to use this to connect to Postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const food = require("./food.model");
const clothes = require("./clothes.model");

module.exports = {
  db: sequelize,
  Food: food(sequelize, DataTypes), // this step is used to create a new table
  Clothes: clothes(sequelize, DataTypes),
};
