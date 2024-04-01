const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const User = require('./User');
const Hotel = require('./Hotel');

const Booking = sequelize.define('booking', {
    checkIn: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    checkOut: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});
Booking.belongsTo(User)
User.hasMany(Booking)
Booking.belongsTo(Hotel)
Hotel.hasMany(Booking)
module.exports = Booking;