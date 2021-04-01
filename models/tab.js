const {DataTypes} = require("sequelize");
const db = require('../db');

const Tab = db.define('tab', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    difficulty: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    dislikes: {
        type: DataTypes.NUMBER,
        allowNull: true
    }
});

module.exports = Tab;