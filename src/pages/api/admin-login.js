import {verifyPassword} from "../../lib/bcrypt";
import {generateAccessToken} from "../../lib/jwt";

const User = require("./../../lib/mongoose/models/user");
const initializeMongoose = require("./../../lib/mongoose");
export default async function handler(req, res) {
  await initializeMongoose();

  if (req.method === 'POST') {
      let {email,password} = req.body;

       let user,accessToken;
        user = await User.findOne({
            email: email.toLowerCase()
        }).exec();
        if(!user){
            res.status(200).json({message: "User not found"});
            return;
        }
        if(!await verifyPassword(password,user.password)){
            res.status(200).json({message: "Incorrect password"});
            return;
        }

    accessToken = await generateAccessToken(user._id,'admin');
    res.status(200).json({status: true,accessToken: accessToken});

  }else {
      res.status(405).json({message: "Method Not Allowed"});
      return ;
  }


}