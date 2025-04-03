import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Service from "./Service.js";

const { DataTypes } = Sequelize;

const Order = db.define(
  "orders",
  {
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, len: [3, 100] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, isEmail: true },
    },
    noHP: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true },
    },
    budget: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0 },
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.ENUM("TransferBank", "EWallet", "COD"),
      allowNull: false,
      validate: { notEmpty: true },
    },
  },
  {
    freezeTableName: true,
  }
);

Service.hasMany(Order);
Order.belongsTo(Service, { foreignKey: "serviceId" });

export default Order;
