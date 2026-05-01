const User = require("../models/User.js")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")




//Register authentcation

const {userRegisterSchema, userLoginSchema
} = require("./Validation/authUserValidation");
const { json } = require("express");

const register = async (req, res, next) => {
    try{
        const{error, value} = userRegisterSchema.validate(req.body, {
            abortEarly:false,
            stripUnknown:true,

        });
    
    if(error) {
         return res.status(400).json({
            msg: error.details.map((err)=> err.message),
         });
}


const{username, email, password}= value;

const existUser = await User.findOne({email});

if (existUser) {
  return res.status(400).json({ msg: "User Already Exists" });
}


 //bcrypt

   const hashPassword = await bcrypt.hash(password,10);

// Insert into DB

   const newUser = await User.create({
    username,
    email,
    password:hashPassword
   });
// Response
    res.status(201).json({
      msg: "Done Create Account",
    });
  } catch (error) {
    next(error);
  }
};



//Login
const login = async (req, res, next) => {
  try {
    const { error, value } = userLoginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        msg: error.details.map((err) => err.message),
      });
    }

const {email, password} = value;
const user = await User.findOne({email}).select("+password")
;
if(!user) return res.status(400).json({msg: "Create Account First!"});




const matchPassword = await bcrypt.compare(password, user.password);

if (!matchPassword) {
      return res.status(400).json({
        msg: "Invalid email or password",
      });
    }


//Generate Token
const token = jwt.sign (
    {
        id:user._id,
    },
    process.env.JWT_SK,
    {
        expiresIn:"1d"
    },
);



// Response

    res.status(200).json({
      msg: "Login Success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

//Logout

const logout = async (req, res) => {
  try {
    res.status(200).json({
      msg: "Logout Success",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

module.exports = {
  register,
  login,
  logout,
};