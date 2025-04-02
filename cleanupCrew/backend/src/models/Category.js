import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Category = sequelize.define('Category', {
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
    friends: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    timestamps: true,
    tableName: 'Category',
  });

  return Category;
};