const { sequelize } = require("../config/database");
const { Sequelize, DataTypes, UUID } = require("sequelize");
const { User } = require("../models/user.model");

const Property = sequelize.define("Property", {
  property_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  property_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  property_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  property_price: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  property_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  property_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  property_purpose: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  geometry: {
    type: DataTypes.GEOMETRY("POINT", 4326),
    allowNull: false,
  },
  /* other_property_images: {
    type: DataTypes.BLOB,
    get() {
      return this.getDataValue("other_property_images").split(",");
    },
    set(img) {
      this.setDataValue("other_property_images", img.join(","));
    },
  }, */
  /* slug: {
    type: DataTypes.VIRTUAL,
    get(){
      return `${this.property_name}${this.property_id}`
    }
  }, */
});

Property.beforeSync(() => {
  console.log("before creating property table");
});

Property.afterSync(() => {
  console.log("after creating property table");
});

User.hasMany(Property, {
  foreignKey: {
    name: "user_id",
    type: DataTypes.UUID,
    allowNull: false
  },
});

module.exports = { Property };
