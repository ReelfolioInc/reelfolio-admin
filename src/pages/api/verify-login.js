import {verifyPassword} from "../../lib/bcrypt";
import {decodeAccessToken, generateAccessToken} from "../../lib/jwt";

const User = require("./../../lib/mongoose/models/user");
const initializeMongoose = require("./../../lib/mongoose");
export default async function handler(req, res) {
  await initializeMongoose();

   let {accessToken} = req.headers;
  try{
       let decoded = await decodeAccessToken(accessToken);
       console.log(decoded);
  }catch (e) {
      res.status(401).json({message: "Permission Denied"});
      return;
  }


}