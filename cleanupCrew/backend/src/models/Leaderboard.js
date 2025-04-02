import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Leaderboard = sequelize.define('Leaderboard', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    timestamps: true,
    tableName: 'Leaderboard',
  });

  return Leaderboard;
};