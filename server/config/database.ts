import mysql from "mysql2";
import { Sequelize } from "sequelize";

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
});

// Connect to the database using Sequelize
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DBUSER,
    process.env.PASSWORD,
    {
      dialect: "mysql",
      host: process.env.HOST,
    }
  );

try {
  connection.query(
    `CREATE DATABASE IF NOT EXISTS Property_App`,
    async function (err, results) {
      if (results) {
        console.log("DB WAS CREATED");

        try {
          await sequelize.authenticate();
          await sequelize.sync();
          console.log("Connected to database using Sequelize");
        } catch (error) {
          console.log(error);
        }

        // Close the connection
        connection.end();
      } else {
        console.log("db was not created");
      }
    }
  );
} catch (error) {
  console.log(error);
}



export { sequelize };
