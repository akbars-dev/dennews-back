const mongoose = require('mongoose');


module.exports = async (mongo_uri) => {
    await mongoose.connect(mongo_uri, {});
    console.log('Database connected');
}