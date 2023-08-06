import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const User = sequelize.define('users', 
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  }, {
    freezeTableName: true,
    timestamps: true
  }
);

export default User;