const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Hotel = require('./Hotel');

const Image = sequelize.define('image', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});
Image.belongsTo(Hotel)
Hotel.hasMany(Image)
module.exports = Image;