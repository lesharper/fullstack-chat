import React from "react";

import Auth from "../Components/Validation/Authorization.js";
import "./stylePage/style-valid.css";

const LoginPage = () => {
  return (
    <div className="validation__block">
      <Auth />
    </div>
  );
};

export default LoginPage;
