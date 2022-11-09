import React, { useState } from "react";

import "./Input.css";

import arrow from "../../images/arrow.png";

function Input({ label, name, onChange, values, setValues }) {
  return (
    <div className="input app__input">
      <label className="input__label">{label}</label>
      <input
        className="input__field"
        value={values[name] || ""}
        onChange={onChange}
        type="number"
        min="0"
        placeholder="0"
        name={name}
        required
      />
      <div
        className="arrow arrow_up"
        onClick={() => {
          if (values[name] != undefined) {
            setValues({ ...values, [name]: String(Number(values[name]) + 1) });
          }
        }}
      >
        <img className="arrow__image" src={arrow} alt="arrow" />
      </div>
      <div
        className="arrow arrow_down"
        onClick={() => {
          if (values[name] != undefined && values[name] != 0) {
            setValues({ ...values, [name]: String(Number(values[name]) - 1) });
          }
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
