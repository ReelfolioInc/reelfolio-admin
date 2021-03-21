const { Schema,model,models } = require("mongoose");

const passwordReset = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    token: String,
    status:  { type: String, default: "pending" },
},{ timestamps: true });

module.exports =  models.PasswordReset ?? model("PasswordReset",passwordReset);

