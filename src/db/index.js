import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "photo_caption_api",
  process.env.DB_USER || "jacobrodriguez",
  "",
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
