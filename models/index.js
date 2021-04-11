const db = require('../db');
const UserModel = require('./user')
const TabModel = require('./tab')
const CommentModel =require('./comment')

UserModel.hasMany(TabModel);
UserModel.hasMany(CommentModel);
TabModel.belongsTo(UserModel);
TabModel.hasMany(CommentModel);
CommentModel.belongsTo(TabModel);
CommentModel.belongsTo(UserModel);


module.exports = {dbConnection: db, models: {UserModel, TabModel, CommentModel}};