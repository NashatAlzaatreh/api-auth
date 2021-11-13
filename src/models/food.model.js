"use strict";

const Food = (sequelize, DataTypes) =>
  sequelize.define("people", {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING },
  });

module.exports = Food;
