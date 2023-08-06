import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Url = sequelize.define('urls', 
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    long_url: {
      type: DataTypes.STRING
    },
    short_url: {
      type: DataTypes.STRING
    },
  }, {
    freezeTableName: true,
    timestamps: true
  }
);

export default Url;