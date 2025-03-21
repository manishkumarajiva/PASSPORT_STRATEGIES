const mongoose = require('mongoose');

const DBconnect = (async (URI) => {
    try {
        const connectionInstance = await mongoose.connect(URI);
        console.log('DATABASE CONNECTED SUCCESSFULLY');
    } catch (error) {
        console.log('DATABASE CONNECTION ERROR',error.message);
    }
})(process.env.MONGO_URI);

module.exports = DBconnect;