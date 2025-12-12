import { sequelize } from "../src/plugins/sequelize.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a PostgreSQL");
  } catch (error) {
    console.error("Error:", error);
  }
})();
