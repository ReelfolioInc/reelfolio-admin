const { Schema,model,models } = require("mongoose");

const conversationSchema = new Schema({
    participants:  [{type: Schema.Types.ObjectId, ref: 'User', index: true}],
    twilioConversationId: String
},{ timestamps: true });

module.exports = models.Conversation ?? model("Conversation",conversationSchema);