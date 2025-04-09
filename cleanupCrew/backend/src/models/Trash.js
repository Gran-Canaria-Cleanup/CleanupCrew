import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Trash = sequelize.define('Trash', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    glass: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    plastic: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    paper: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'Trash',
  });

  return Trash;
};