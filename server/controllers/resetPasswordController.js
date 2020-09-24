require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
sgMail.setApiKey(SENDGRID_API_KEY);
const { CLIENT_URL } = require("../functions/constants");

const sendToken = (user) => {
  const tokenLink = `${CLIENT_URL}/recovery/reset-password/${user.recoverPasswordToken}`;
  const msg = {
    to: user.email,
    from: "nguyenvietnam2401@gmail.com", // Use the email address or domain you verified above
    subject: "iCrowdTask: Reset Password",
    html: `Please <a href="${tokenLink}">click here</a> to reset your password. This link will be invalid after 30 minutes`,
  };
  (async () => {
    try {
      await sgMail.send(msg);
      console.log("Email Sent");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
};

const get_email = (req, res) => {
  res.render("forgotpassword", { message: null });
};
const post_email = (req, res) => {
  const { email } = req.body;

  let recoverPasswordToken = uuid.v4();
  let recoverTokenExpirationDate = Date.now() + 60 * 30 * 1000; // ms
  User.findOneAndUpdate(
    { email },
    { recoverPasswordToken, recoverTokenExpirationDate }
  )
    .then(async (user) => {
      if (user === null) {
        res.json({ user: "", message: "Email does not exist" });
      } else {
        const savedUser = await User.findOne({ email });
        // Send email
        sendToken(savedUser);
        res.json({ user: savedUser, message: true });
      }
    })
    .catch(() => res.json({ user: "", message: "Email does not exist" }));
};
const get_reset_password = (req, res) => {
  const token = req.params.token;
  User.findOne({
    recoverPasswordToken: token,
    recoverTokenExpirationDate: { $gt: Date.now() },
  }).then((user) => {
    if (user === null) {
      res.json({ message: "invalid" });
    } else {
      res.json({ message: "ok" });
    }
  });
};
const post_reset_password = async (req, res) => {
  const token = req.params.token;
  let { password, rePassword } = req.body;
  if (!validator.equals(password, rePassword)) {
    res.json({
      message: "Passwords do not match",
      token,
    });
  } else if (!validator.isLength(password, { min: 8 })) {
    res.json({
      message: "Password must be at least 8 characters",
      token,
    });
  } else {
    // Hash password
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password.trim(), salt);
    User.findOneAndUpdate(
      {
        recoverPasswordToken: token,
        recoverTokenExpirationDate: { $gt: Date.now() },
      },
      {
        password,
        recoverTokenExpirationDate: undefined,
        recoverPasswordToken: undefined,
      }
    )
      .then((user) => {
        res.json({ message: "login" });
      })
      .catch(() => res.json({ message: "invalid" }));
  }
};

module.exports = {
  get_email,
  post_email,
  get_reset_password,
  post_reset_password,
};
