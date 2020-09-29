import React from "react";
import { Link } from "react-router-dom";

const BackToLogin = () => {
  return (
    <div className="log-in">
      <Link to="/login">Back to Log in</Link>
    </div>
  );
};

export default BackToLogin;
