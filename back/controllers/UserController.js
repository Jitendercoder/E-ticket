
import RequestFlow from "../models/RequestFlow.js";
import User from "../models/User.js";
import UserInfo from "../models/UserInfo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const addUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("inside add user");
  User.find({ username: username }).then((value) => {
    if (value != "") {
      res.status(200).send({
        success: false,
        message: "Username already Exists. Use other username.",
      });
    } else {
      bcrypt.hash(password, 13, (error, hash) => {
        if (hash) {
          User.create({ username, password: hash })
            .then((newUser) => {
              if (newUser != "") {
                console.log("added in database");
                res.status(200).send({
                  added: true,
                  message: "User Added Successfully!",
                });
              } else {
                res.status(200).send({
                  added: false,
                  message: "Could'n add User.",
                });
              }

              return;
            })
            .catch((error) => {
              res.status(200).send({
                message: "could not add user ",
                error: error.message,
              });
            });
        }
      });
    }
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((value) => {
      return res.status(200).send({
        success: true,
        data: value,
        message: "User found",
      });
    })
    .catch((error) => {
      return res.status(200).send({
        success: false,
        data: [],
        message: "User not found",
      });
    });
};

const getUsers = async (req, res) => {
  User.find()
    .then((value) => {
      return res.status(200).send({
        success: true,
        data: value,
        message: "User  found",
      });
    })
    .catch((error) => {
      return res.status(200).send({
        success: false,
        data: value,
        message: "User not found",
      });
    });
};

const updateRole = async (req, res) => {
  const { username, role } = req.body;
  console.log("inside upadate" + userId + "  " + role);

  await User.updateOne({ username: username }, { $set: { role: role } });
};

const addUserInfo = async (req, res) => {
  console.log("inside add user info ");
  const {
    firstName,
    lastName,
    age,
    gender,
    email,
    mobile,
    address,
    username,
    password,
  } = req.body;

  const userId2 = (await User.countDocuments()) + 100;
  console.log("inside add user " + userId2);
  User.find({ username: username }).then((value) => {
    if (value != "") {
      return res.status(200).send({
        success: false,
        message: "Username already Exists. Use other username.",
      });
    } else {
      bcrypt.hash(password, 13, (error, hash) => {
        if (hash) {
          console.log("data : username " + username + " id " + userId2);
          User.create({ userId: userId2, username, password: hash })
            .then((newUser) => {
              if (newUser != "") {
                UserInfo.create({
                  userId: userId2,
                  firstName,
                  lastName,
                  age,
                  gender,
                  email,
                  mobile,
                  address,
                })
                  .then((value) => {
                    return res.status(200).send({
                      success: true,
                      data: value,
                      message: "UserInfo  added",
                    });
                  })
                  .catch((error) => {
                    return res.status(200).send({
                      success: false,
                      data: [],
                      message: "UserInfo not added \n" + error.message,
                    });
                  });
              } else {
                res.status(200).send({
                  success: false,
                  message: "Could'n add User.",
                });
              }

              return;
            })
            .catch((error) => {
              res.status(200).send({
                success: false,
                message: "could not add user " + error.message,
                error: error.message,
              });
            });
        }
      });
    }
  });
};

const login = async (req, res) => {
  console.log("inside login method")
  const {username , password } = req.body
  const user = await User.findOne({username})
  if(!user){
    return res.status(200).send({
      success:false,
      data:{},
      message:"user not found"
    })
  }

  const valid = await bcrypt.compare(password , user.password)
  if(!valid){
    return res.status(200).send({
      success:false,
      data:{},
      message:"wrong password"
    })
  }

  const token = jwt.sign({
    userId : user.userId,
    role:user.role,
    username:username
  },"abcdef12345",{
    expiresIn:'1h'
  })

  return res.status(200).send({
    success:true,
    data:token,
    token:token,
    message:"logged in successfullly"
  })

};

export { addUser, getUserById, getUsers, updateRole, addUserInfo, login };
