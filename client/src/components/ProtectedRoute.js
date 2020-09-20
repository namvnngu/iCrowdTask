import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedHome = ({ auth, component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={() => (auth ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

const ProtectedLogin = ({ auth, component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={() => (auth ? <Redirect to="/" /> : <Component />)}
    />
  );
};

export { ProtectedHome, ProtectedLogin };
