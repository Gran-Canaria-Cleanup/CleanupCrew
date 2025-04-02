import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
  }, {
    timestamps: true,
    tableName: 'Questions',
  });

  return Question;
};
