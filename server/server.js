require("dotenv").config();

const app = require("./src/app");
const {
  sequelize,
  syncDatabase,
} = require("./src/models");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("PostgreSQL connected successfully");

    await syncDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:");
    console.error(error);
  }
};

startServer();