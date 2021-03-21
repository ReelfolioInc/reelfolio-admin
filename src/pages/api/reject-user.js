const User = require("./../../lib/mongoose/models/user");
const initializeMongoose = require("./../../lib/mongoose");
export default async function handler(req, res) {
  await initializeMongoose();
  let {userId} = req.query;

  // Check for admin permissions
    try{
         let user = User.findByIdAndUpdate(userId,{
              isApproved: false,
              isRejected: true
         }).exec();
        res.status(200).json({status: true});
    }catch (e) {
        res.status(200).json({status: false});
    }
}