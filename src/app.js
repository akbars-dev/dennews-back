require('dotenv').config();
const express = require('express');
const connect = require('./utils/mongoose-util');

const app = express();


app.use(express.json());

app.use('/api', require('./router'));


app.listen(process.env.PORT, async () => {
    await connect(process.env.MONGO_URI)
    console.log(`Server running on port ${process.env.PORT}`)
});