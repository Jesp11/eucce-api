import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

/**
 * @type {Sequelize}
 */
export const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  logging: false
});
