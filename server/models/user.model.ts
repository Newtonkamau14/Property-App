import { Model,DataTypes } from "sequelize";
import { sequelize } from "../config/database";


interface UserAttributes {
  user_id?: string
  username: string
  email:string
  role: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

class User extends Model<UserAttributes> implements UserAttributes {
  public user_id!: string;
  public username!: string;
  public email!: string;
  public role!: string;
  public password!: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

User.init({
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
  }
},{
  timestamps: true,
  sequelize,
  modelName: "Users" ,
  freezeTableName: true
})


User.beforeSync(() => {
  console.log("before creating user table");
});

User.afterSync(() => {
  console.log("after creating user table");
});



export { User };
