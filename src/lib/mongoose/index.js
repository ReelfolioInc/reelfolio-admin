const mongoose = require("mongoose");

let mongooseClient = null;
const initializeMongoose = async () => {

    if(!mongooseClient || mongooseClient?.connection?.readyState !== 1){
        console.log("creating new connection");
        mongooseClient =  await mongoose.connect(process.env.DATABASE_URI, {
            poolSize: 1,
            autoIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useNewUrlParser: true,
        });
        return mongooseClient
    }else{
        console.log("using old connection");
        return mongooseClient;
    }
};


module.exports = initializeMongoose;
