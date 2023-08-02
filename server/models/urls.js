import { DataTypes } from 'sequelize';

export default function (sequelize) {
  return sequelize.define('urls', {
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
    }
  }, {
    freezeTableName: true,
    timestamps: true
  });
}
