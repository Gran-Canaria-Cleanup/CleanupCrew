import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Goal = sequelize.define('Goal', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    target: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
  }, {
    timestamps: true,
    tableName: 'Goals',
  });

  return Goal;
};