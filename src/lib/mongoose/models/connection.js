const { Schema,model,models} = require("mongoose");

const connectionSchema = new Schema({
    from:  {type: Schema.Types.ObjectId, ref: 'User', index: true},
    to:  {type: Schema.Types.ObjectId, ref: 'User'},
    status: {type: String, default: "pending"}
},{ timestamps: true });


module.exports =  models.Connection ?? model("Connection",connectionSchema);