import {decodeAccessToken} from "../../lib/jwt";
import {sendWelcomeEmail} from "../../lib/sendgrid";

const User = require("./../../lib/mongoose/models/user");
const initializeMongoose = require("./../../lib/mongoose");
export default async function handler(req, res) {
  await initializeMongoose();
  let {userId} = req.query;
  let accessToken = req.headers.accesstoken;
  try{
       let decoded = await decodeAccessToken(accessToken);
       if(decoded.data.role !== "admin"){
           res.status(401).json({message: "Permission Denied"});
        return;
       }
  }catch (e) {
      res.status(401).json({message: "Permission Denied"});
      return;
  }

  // Check for admin permissions
    try{
         let user = await User.findByIdAndUpdate(userId,{
              isApproved: true
         }).exec();
         let emailRes = await sendWelcomeEmail(user.firstName,user.email);
        res.status(200).json({status: true});
    }catch (e) {
        res.status(200).json({status: false});
    }
}