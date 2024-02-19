const mongoose = require("mongoose");

const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const SECRET = process.env.SECRET;

const empoleeSchema = new mongoose.Schema(
  {
    Id: Number,
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    isVarified: Boolean,
    isNewUser: Boolean,

    token: {
      type: String,
    },

    password: String,
    Phone: String,
    address: String,
    ProfileImage: String,
    date: String,
    fullname: String,
    expireIn: Number,
  },
  {
    timestamps: true,
  }
);



empoleeSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id.toString() }, SECRET, {
      expiresIn: "30d",
    });

    this.token = token;
    await this.save();

    return token;
  } catch (error) {
    console.log(error);
    console.log("Error in token generation");
  }
};

empoleeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const providerRegister = new mongoose.model("mirsalSignup", empoleeSchema);

module.exports = providerRegister;
