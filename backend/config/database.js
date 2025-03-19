require("dotenv").config();
const { Sequelize } = require("sequelize"); // Import Sequelize

// Create a Sequelize instance with environment variables
const sequelize = new Sequelize('pureharvest', 'root', 'Gayani123@#', {
    host: 'localhost',
    dialect: 'mysql',
  });
  

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((err) => console.error("❌ Error connecting to the database:", err));

module.exports = sequelize;
