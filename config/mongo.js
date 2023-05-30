const mongoose = require('mongoose');

const dbConnect = async () => {
    const dbUri = process.env.DB_URI;
    try {
        await mongoose.connect(
            dbUri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('DB connection succeed!');
    } catch (error) {
        console.error('DB connection fail! ' + error.message);
        process.exit(1);
    }

};

module.exports = dbConnect;
