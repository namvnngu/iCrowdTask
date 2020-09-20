import validator from "validator";
function validateLogin(user, setUser) {
  let message;
  const { email, password } = user;

  if (!validator.isEmail(email)) {
    message = "Please provide correct email";
    setUser({ ...user, email: "" });
    return { success: false, message };
  }
  if (!validator.isLength(password, { min: 8 })) {
    message = "Your password must be at least 8 character";
    setUser({ ...user, password: "" });
    return { success: false, message };
  }
  return { success: true, message: "" };
}
export default validateLogin;
