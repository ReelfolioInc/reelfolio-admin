const { Schema,model, models } = require("mongoose");

const roleSchema = new Schema({
    title: String,
    category: String
},{ timestamps: true });


module.exports =  models.Role ?? model("Role",roleSchema);