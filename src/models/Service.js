import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const service = db.define(
  "services",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { notEmpty: true},
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
  },
  {
    freezeTableName: true,
  }
);

export default service;
