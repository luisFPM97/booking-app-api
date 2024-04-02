const app = require('../app');
const User = require('../models/User');
const sequelize = require('../utils/connection');
const request = require('supertest');
const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const user = {
                firstName: "FERNANDO", 
                lastName: "Pinzon Morales", 
                email: "luis.pinzon.m.m@gmail.com", 
                password: "123456789", 
                gender: "male"
        }
        const userTest = await User.findOne({where: {email: "luis.pinzon.m.m@gmail.com"}})
        if(!userTest) {
            await request(app).post('/users').send(user)
        }
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();