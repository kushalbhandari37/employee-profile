const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MongoURI');

//Connecting Database
const connectDB = async ()=>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true
        });
        console.log('MongoDB connected');
        
    } catch (error) {
        console.error(error.messaage);        
        
    }
}

module.exports = connectDB;