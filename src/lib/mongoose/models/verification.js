const { Schema,model, models } = require("mongoose");

const verificationSchema = new Schema({
    type: String, // (phone | email)
    code: String,
    expiresAt: Date
},{ timestamps: true });

module.exports =  models.Verification ?? model("Verification",verificationSchema);

