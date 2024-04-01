const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Hotel = require('./Hotel');
const User = require('./User');

const Review = sequelize.define('review', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
Review.belongsTo(Hotel)
Hotel.hasMany(Review)
Review.belongsTo(User)
User.hasMany(Review)
module.exports = Review;