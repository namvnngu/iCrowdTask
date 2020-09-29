import React from "react";
import { Link } from "react-router-dom";

const LoginWithFace = () => {
  return (
    <Link to="/login/face/email">
      <div className="login-with-face">
        <FaceIcon />
        <div className="login-face">Login With Face</div>
      </div>
    </Link>
  );
};
const FaceIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};
export default LoginWithFace;
