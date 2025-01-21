const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser : true,
    dnName          : 
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('Connected DB');
    } catch (error) {
        console.log(error);
        throw error;
    }
}