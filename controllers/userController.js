const hash = require("bcrypt").hash;
const compare = require("bcrypt").compare;
const getRepo = require("typeorm").getRepository;
const jwt = require("jsonwebtoken");

// JWT Json Web Tokens

const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
  try {
    const UserRepo = getRepo("User");
    const { email, password } = req.body;

    if (password.length < 8) throw new Error("Invalid password");
    const existingUser = await UserRepo.findOne({ email });
    console.log(existingUser);

    if (existingUser) throw new Error("User already exists");

    // Hashing password

    const hashedPassword = await hash(password, SALT_ROUNDS);

    // Saving them in the DB
    const newUser = await UserRepo.save({
      email,
      password: hashedPassword,
    });

    return res.status(200).send({
      message: "User Registered",
      data: { user: newUser },
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: {},
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const UserRepo = getRepo("User");
    const { email, password } = req.body;

    // Checking with the DB entry
    const user = await UserRepo.findOne({ email });

    if (!user) throw new Error("User not found");

    const result = await compare(password, user.password);

    if (result) {
      const access_token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET
      );

      return res.status(200).send({
        message: "User Logged in",
        data: { user, access_token },
        success: true,
      });
    } else {
      return res.status(404).send({
        message: "Invalid user credentials",
        data: {},
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: {},
      success: false,
    });
  }
};

exports.profile = async (req, res) => {
  const UserRepo = getRepo("User");
  const user = await UserRepo.findOne({ email: req.user.email }); // req.user = {email}
  return res.json({
    message: "user profile sent",
    data: { user },
    success: true,
  });
};
