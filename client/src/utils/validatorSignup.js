import validator from "validator";
function validateSignUp(user, setUser) {
  let message;
  const {
    country,
    firstName,
    lastName,
    email,
    password,
    rePassword,
    address1,
    address2,
    city,
    state,
    phoneNumber,
  } = user;
  if (validator.isEmpty(country)) {
    message = "Please choose your country";
    return { success: false, message };
  }
  if (validator.isEmpty(firstName)) {
    message = "Please enter first name";
    return { success: false, message };
  }
  if (validator.isEmpty(lastName)) {
    message = "Please enter last name";
    return { success: false, message };
  }
  if (!validator.isEmail(email)) {
    message = "Please provide correct email";
    setUser({ ...user, email: "" });
    return { success: false, message };
  }
  if (!validator.equals(password, rePassword)) {
    message = "Password doesn't match with Confirm password";
    setUser({ ...user, password: "", rePassword: "" });
    return { success: false, message };
  }
  if (!validator.isLength(password, { min: 8 })) {
    message = "Your password must be at least 8 character";
    setUser({ ...user, password: "", rePassword: "" });
    return { success: false, message };
  }
  if (validator.isEmpty(address1)) {
    message = "Please provide your home address";
    setUser({ ...user, address1, address2 });
    return { success: false, message };
  }
  if (validator.isEmpty(city)) {
    message = "Please provide City";
    setUser({ ...user, city });
    return { success: false, message };
  }
  if (validator.isEmpty(state)) {
    message = "Please provide State, Province or Region";
    return { success: false, message };
  }
  if (
    phoneNumber !== "" &&
    !validator.isMobilePhone(phoneNumber, [
      "en-AU",
      "en-CA",
      "en-GB",
      "en-GG",
      "en-GH",
      "en-HK",
      "en-MO",
      "en-IE",
      "en-IN",
      "en-KE",
      "en-MT",
      "en-MU",
      "en-NG",
      "en-NZ",
      "en-PK",
      "en-PH",
      "en-RW",
      "en-SG",
      "en-SL",
      "en-UG",
      "en-US",
      "en-TZ",
      "en-ZA",
      "en-ZM",
      "en-ZW",
    ])
  ) {
    message = "Please provide the correct phone number";
    setUser({ ...user, phoneNumber: "" });
    return { success: false, message };
  }
  return { success: true, message: "" };
}
export default validateSignUp;
