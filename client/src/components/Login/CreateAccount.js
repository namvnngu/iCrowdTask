import React from "react";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div className="sign-up-account">
      <Link to="/signup">Create a new account</Link>
    </div>
  );
};

export default CreateAccount;
