"use strict";

const Clothes = (sequelize, DataTypes) =>
  sequelize.define("people", {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING },
  });

module.exports = Clothes;
