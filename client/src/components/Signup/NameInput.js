import React from "react";

const NameInput = ({ user, setUser, setError }) => {
  const handleFirstName = (e) => {
    setError(null);
    setUser({ ...user, firstName: e.target.value });
  };
  const handleLastName = (e) => {
    setError(null);
    setUser({ ...user, lastName: e.target.value });
  };
  return (
    <div className="name">
      <div className="first-name">
        <label htmlFor="firstName">
          First name<span className="warning-span">*</span>
        </label>
        <input
          type="text"
          name="firstName"
          id="first-name"
          onChange={handleFirstName}
        />
      </div>
      <div className="last-name">
        <label htmlFor="lastName">
          Last name<span className="warning-span">*</span>
        </label>
        <input
          type="text"
          name="lastName"
          id="last-name"
          onChange={handleLastName}
        />
      </div>
    </div>
  );
};
export default NameInput;
