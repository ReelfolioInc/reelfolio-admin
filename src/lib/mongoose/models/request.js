const { Schema,model, models } = require("mongoose");



const requestSchema = new Schema({
    from:  {type: Schema.Types.ObjectId, ref: 'User'},
    to:  {type: Schema.Types.ObjectId, ref: 'User'},
    status: { type: String, default: "pending" },
    type: String,
    message: String,
    phone: String,
    email: String,
    credits: [{type: Schema.Types.ObjectId, ref: 'Credit'}]
},{ timestamps: true });


module.exports =  models.Request ?? model("Request",requestSchema);