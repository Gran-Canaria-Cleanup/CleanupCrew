/* global process */
import { Sequelize } from 'sequelize';
import UserModel from './User.js';
import AchievementModel from './Achievement.js';
import CategoryModel from './Category.js';
import TrashModel from './Trash.js';
import LeaderboardModel from './Leaderboard.js';
import FriendModel from './Friend.js';
import QuestionModel from './Question.js';

// Initialize Sequelize with MySQL connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
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

// Define relationships
User.hasMany(Achievement, { foreignKey: 'user_id' });
Achievement.belongsTo(User, { foreignKey: 'user_id' });

Achievement.hasOne(Category, { foreignKey: 'achievement_id' });
Category.belongsTo(Achievement, { foreignKey: 'achievement_id' });

User.hasMany(Trash, { foreignKey: 'user_id' });
Trash.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Leaderboard, { foreignKey: 'user_id' });
Leaderboard.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Friend, { foreignKey: 'user_id' });
Friend.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Question, { foreignKey: 'user_id' });
Question.belongsTo(User, { foreignKey: 'user_id' });

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
};