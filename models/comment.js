const {DataTypes} = require("sequelize");
const db = require('../db');

const Comment = db.define('comment', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Comment;