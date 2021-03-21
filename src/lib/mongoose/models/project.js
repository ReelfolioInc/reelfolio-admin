const { Schema,model,models } = require("mongoose");


const hiringRoleSchema = new Schema({
    role: {type: Schema.Types.ObjectId, ref: 'Role'},
    quantity: Number
},{ timestamps: true });

const projectSchema = new Schema({
    title : String,
    logLine : String,
    description : String,
    categories: [{type: Schema.Types.ObjectId, ref: 'ProjectCategory'}],
    media: [String],
    owners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: String,
    location: String,
    isHiring: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    isUnion: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    thumbnail: String,
    startDate: String,
    endDate: String,
    hiringRoles: [hiringRoleSchema]
},{ timestamps: true });

projectSchema.index({ 'title': 'text' });


module.exports = models.Project ?? model("Project",projectSchema);

