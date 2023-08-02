import { DataTypes } from 'sequelize';

export default function (sequelize) {
  return sequelize.define('users', {
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
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' }
    }
  }, {
    freezeTableName: true,
    timestamps: true
  });
}
