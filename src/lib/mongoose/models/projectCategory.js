const { Schema,model, models } = require("mongoose");

const projectCategorySchema = new Schema({
    title: String
},{ timestamps: true });


module.exports =  models.ProjectCategory ?? model("ProjectCategory",projectCategorySchema);