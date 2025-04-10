/* global process */
import { Sequelize } from 'sequelize';
import UserModel from './User.js';
import AchievementModel from './Achievement.js';
import CategoryModel from './Category.js';
import TrashModel from './Trash.js';
import LeaderboardModel from './Leaderboard.js';
import FriendModel from './Friend.js';
import QuestionModel from './Question.js';
import GoalsModel from './Goals.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Sequelize with MySQL connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  logging: false,
});

// Define models
const User = UserModel(sequelize);
const Achievement = AchievementModel(sequelize);
const Category = CategoryModel(sequelize);
const Trash = TrashModel(sequelize);
const Leaderboard = LeaderboardModel(sequelize);
const Friend = FriendModel(sequelize);
const Question = QuestionModel(sequelize);
const Goal = GoalsModel(sequelize);

// Define the intermediary model (LeaderboardUser)
const LeaderboardUser = sequelize.define('LeaderboardUser', {}, { timestamps: false });

// Define relationships
User.hasMany(Achievement, { foreignKey: 'user_id' });
Achievement.belongsTo(User, { foreignKey: 'user_id' });

Achievement.hasOne(Category, { foreignKey: 'achievement_id' });
Category.belongsTo(Achievement, { foreignKey: 'achievement_id' });

User.hasMany(Trash, { foreignKey: 'user_id' });
Trash.belongsTo(User, { foreignKey: 'user_id' });

Leaderboard.belongsToMany(User, { through: LeaderboardUser });
User.belongsToMany(Leaderboard, { through: LeaderboardUser });

User.hasMany(Friend, { foreignKey: 'user_id' });
Friend.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Question, { foreignKey: 'user_id' });
Question.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Goal, { foreignKey: 'user_id' });
Goal.belongsTo(User, { foreignKey: 'user_id' });

// Export models and sequelize instance
export {
  sequelize,
  User,
  Achievement,
  Category,
  Trash,
  Leaderboard,
  Friend,
  Question,
  Goal,
};
