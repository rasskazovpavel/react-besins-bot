import React from "react";

import "./Button.css";

function Button({ children, valid = true, mod, handler }) {
  return (
    <button
      className={`button ${!valid && "button_disabled"} ${mod}`}
      disabled={!valid}
      onClick={handler}
    >
      {children}
    </button>
  );
}

export default Button;
