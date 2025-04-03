import { Sequelize } from "sequelize";

const db = new Sequelize("raftroot", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
