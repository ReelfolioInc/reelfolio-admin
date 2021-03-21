import {decodeAccessToken} from "../../lib/jwt";

const User = require("./../../lib/mongoose/models/user");
const initializeMongoose = require("./../../lib/mongoose");
export default async function handler(req, res) {
  await initializeMongoose();
  let {isApproved,isRejected} = req.query;

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


  let userQuery = User.find().sort({"createdAt": -1});


  // isApproved was specified
  if(isApproved !== undefined && isApproved !== null && isApproved === 'false'){
    userQuery.where("isApproved").equals(false);
  }else if(isApproved !== undefined && isApproved !== null && isApproved === 'true'){
    userQuery.where("isApproved").equals(true);
  }

  if(isRejected !== undefined && isRejected !== null && isRejected === 'false'){
    userQuery.where("isRejected").equals(false);
  }else if(isRejected !== undefined && isRejected !== null && isRejected === 'true'){
    userQuery.where("isRejected").equals(true);
  }

  let users = await userQuery.exec();
  res.status(200).json({users});
}