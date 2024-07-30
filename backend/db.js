const mongoose = require('mongoose');
const dotenv = require('dotenv')
const MONGOURL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

const mongoDB = async()=>{
    mongoose.connection.on('connected', () => console.log('connected'));
    mongoose.connection.on('open', () => console.log('open'));
    mongoose.connection.on('disconnected', () => console.log('disconnected'));
    mongoose.connection.on('reconnected', () => console.log('reconnected'));
    mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
    mongoose.connection.on('close', () => console.log('close'));

    await mongoose.connect('mongodb://127.0.0.1:27017/econest');

    
}

module.exports = mongoDB;
