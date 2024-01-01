const { sequelize } = require("../../config/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "ADMIN",
    values: ["ADMIN", "USER"],
  },
  password: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

User.beforeSync(() => {
  console.log("before creating user table");
});

User.afterSync(() => {
  console.log("after creating user table");
});



module.exports = { User };
