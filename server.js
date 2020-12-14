const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

// Init middleware
app.use(express.json({extended:false}));

//Server running PORT
const PORT = process.env.PORT || 5000;

//Define Routers
app.use('/api/users',require('./routes/api/users'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/auth',require('./routes/api/auth'));


//Testing the server
app.get('/',(req,res)=>{
    res.send('hello there');
})


app.listen(PORT,()=>{
    console.log('Server has started');
})