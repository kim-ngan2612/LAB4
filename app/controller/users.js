const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res, next) => {
  try {
    // get user info
    const username = req.body.username;
    const password = req.body.password;

    //   check username or password empty
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username or password must be not empty!" });
    }

    // hash password
    const hashPass = await bcrypt.hash(password, 10);

    // create new Users
    const newUser = new Users({ username, password: hashPass });

    // save user
    await newUser.save();

    // return new user
    return res
      .status(201)
      .json({ user: newUser, message: "Create user success!" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //   check username or password empty
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username or password must be not empty!" });
  }

  const user = await Users.findOne({ username });
  if (!user) {
    return res.status(401).send("Username and password wrong.");
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send("Username and password wrong.");
  }

  const accessTokenLife = "10h";
  const accessTokenSecret = "ACCESS_TOKEN_SECRET";

  const dataForAccessToken = {
    username: user.username,
  };
  const accessToken = await jwt.sign(dataForAccessToken, accessTokenSecret, {
    algorithm: "HS256",
    expiresIn: accessTokenLife,
  });
  if (!accessToken) {
    return res.status(401).send("Login Failed!");
  }

  return res.status(200).json({
    msg: "Login Success.",
    accessToken
  });
};
