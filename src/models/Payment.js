import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Order from "./Order.js"; 

const { DataTypes } = Sequelize;

const Payment = db.define(
  "payments",
  {
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: { notEmpty: true },
    },
    paymentProof: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: { notEmpty: true },
    },
  },
  {
    freezeTableName: true,
  }
);
Order.hasOne(Payment);
Payment.belongsTo(Order, { foreignKey: "orderId" });

export default Payment;
