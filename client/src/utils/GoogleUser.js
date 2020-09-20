import { URL } from "./constants";
import axios from "axios";
const checkUserExists = async (id) => {
  const { data } = await axios.get(`${URL}/workers/${id}`);
  return data.user !== null;
};
const addGoogleUser = async (userInfo) => {
  const user = {
    country: "Google",
    firstName: userInfo.familyName,
    lastName: userInfo.givenName,
    email: userInfo.email,
    password: "123456789",
    city: "Google",
    state: "Google",
    zipCode: "Google",
    phoneNumber: "",
    address: "Google",
  };

  const { data } = await axios.post(
    `${URL}/workers/${userInfo.googleId}`,
    user
  );
  return data.user;
};

export { addGoogleUser, checkUserExists };
