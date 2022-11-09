import React from "react";

import "./Button.css";

function Button({ children, valid = true, mod, handler, type = "submit" }) {
  return (
    <button
      className={`button ${!valid && "button_disabled"} ${mod}`}
      disabled={!valid}
      onClick={handler}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
