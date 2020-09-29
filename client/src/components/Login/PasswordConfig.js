import React from "react";
import { Link } from "react-router-dom";

const PasswordConfig = ({ user, setUser, setError }) => {
  const handleChange = (e) => {
    setError(null);
    setUser({ ...user, savePassowrd: e.target.value });
  };

  return (
    <div className="password-config">
      <div className="save">
        <input type="checkbox" name="save" id="save" onChange={handleChange} />
        <label htmlFor="save">Save password</label>
      </div>
      <div className="forgot">
        <Link to="/recovery/forgot">Forgot?</Link>
      </div>
    </div>
  );
};

export default PasswordConfig;
