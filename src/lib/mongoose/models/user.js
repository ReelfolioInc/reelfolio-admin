const { Schema,model,models } = require("mongoose");

const userSchema = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    phone: String,
    isApproved : { type: Boolean, default: false },
    isOnboarded : { type: Boolean, default: false },
    isRejected: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    invitation: { type: Schema.Types.ObjectId, ref: 'Request' },
    previousWork : [String],
    profilePicture: String,
    securityRoles :  { type: [String], default: ["user"] },
    primaryRole: { type: Schema.Types.ObjectId, ref: 'Role'} ,
    secondaryRoles : [{ type: Schema.Types.ObjectId, ref: 'Role'}],
    birthday: String,
    currentLocation: String,
    handle : String,
    reel : String,
    description : String,
    credits: [{ type: Schema.Types.ObjectId, ref: 'Credit'}],
    bookmarkedUsers : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    bookmarkedProjects : [{ type: Schema.Types.ObjectId, ref: 'Project' }]
},{ timestamps: true });

userSchema.index({ 'firstName': 'text', 'lastName': 'text', 'handle': 'text' });

module.exports =  models.User ?? model("User",userSchema);

