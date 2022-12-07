import React from "react";

import "./Checkbox.css";

function Checkbox({ text, id, onChange, value, name }) {
  return (
    <label className="checkbox" htmlFor={`checkbox${id}`}>
      {text}
      <input
        className="checkbox__input"
        type="checkbox"
        id={`checkbox${id}`}
        name={name ? name : value}
        onChange={onChange}
      />
      <span className="checkbox__mark"></span>
    </label>
  );
}

export default Checkbox;
