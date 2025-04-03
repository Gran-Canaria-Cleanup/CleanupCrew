import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Leaderboard = sequelize.define('Leaderboard', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: true,
    tableName: 'Leaderboard',
  });

  return Leaderboard;
};
