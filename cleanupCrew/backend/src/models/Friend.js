import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Friend = sequelize.define('Friend', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'Friends',
  });

  return Friend;
};