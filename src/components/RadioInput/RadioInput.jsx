import React from "react";

import "./RadioInput.css";

function RadioInput({ question, variants, onChange, num, id }) {
  return (
    <>
      <h3 className="question">{question}</h3>
      <div className="switch-field">
        {variants.map((item, index) => {
          return (
            <div className="switch-field__wrapper" key={item + index}>
              <input
                className="switch-field__input"
                type="radio"
                id={num ? `radio${num * 4 + index}` : item.value}
                name={num ? `question${num}` : id}
                value={item.value}
                onChange={onChange}
                required
              />
              <label
                className="switch-field__label"
                htmlFor={num ? `radio${num * 4 + index}` : item.value}
              >
                {item.value}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RadioInput;
