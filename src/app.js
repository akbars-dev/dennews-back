require('dotenv').config();
const express = require('express');
const connect = require('./utils/mongoose-util');
const path = require('path');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/photos', express.static(path.join(__dirname, '../', 'uploads')));


app.use('/api', require('./router'));


app.listen(process.env.PORT, async () => {
    await connect(process.env.MONGO_URI)
    console.log(__dirname);
    
    console.log(`Server running on port ${process.env.PORT}`)
});