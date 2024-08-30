import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/database";
const { User } = require("../models/user.model");

type Coordinates = {
  type: string
  coordinates: number[]
};

interface PropertyAttributes {
  property_id: string;
  property_name: string;
  property_location: string;
  property_price: number;
  property_image: string;
  property_type: string
  property_purpose: string;
  availability: boolean;
  geometry: Coordinates;
  createdAt?: Date;
  updatedAt?: Date;
}

class Property extends Model<PropertyAttributes> implements PropertyAttributes {
  public property_id!: string;
  public property_name!: string;
  public property_location!: string;
  public property_price!: number;
  public property_image!: string;
  public property_type!: string;
  public property_purpose!: string;
  public availability!: boolean;
  public geometry!: Coordinates;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Property.init(
  {
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
  },
  {
    timestamps: true,
    sequelize,
    modelName: "Properties",
    freezeTableName: true
  }
)


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
    allowNull: false,
  },
});

export { Property };
