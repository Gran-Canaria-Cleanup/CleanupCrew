import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Achievement = sequelize.define('Achievement', {
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
    tableName: 'Achievements',
  });

  return Achievement;
};