const { Schema,model,models } = require("mongoose");

const creditSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', index: true},
    project: {type: Schema.Types.ObjectId, ref: 'Project', index: true},
    role: {type: Schema.Types.ObjectId, ref: 'Role'},
    creditedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    status: { type: String, default: "pending" }
},{ timestamps: true });

module.exports = models.Credit ?? model("Credit",creditSchema);