import React, { useState } from "react";

import "./Input.css";

import arrow from "../../images/arrow.png";

function Input({ label }) {
  const [value, setValue] = useState("");

  return (
    <div className="input app__input">
      <p className="input__label">{label}</p>
      <input
        className="input__field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="number"
        min="0"
        placeholder="0"
      />
      <div
        className="arrow arrow_up"
        onClick={() => setValue((prev) => prev + 1)}
      >
        <img className="arrow__image" src={arrow} alt="arrow" />
      </div>
      <div
        className="arrow arrow_down"
        onClick={() => {
          if (value != 0) setValue((prev) => prev - 1);
        }}
      >
        <img
          className="arrow__image arrow__image_down"
          src={arrow}
          alt="arrow"
        />
      </div>
    </div>
  );
}

export default Input;
