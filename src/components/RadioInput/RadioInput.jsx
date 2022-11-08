import React from "react";

import "./RadioInput.css";

function RadioInput({ question, variants, onChange, num }) {
  return (
    <>
      <h3>{question}</h3>
      <div className="switch-field">
        {variants.map((item, index) => {
          return (
            <>
              <input
                type="radio"
                id={`radio${num * 4 + index}`}
                name={`question${num}`}
                value={item.value}
                onChange={onChange}
                required
              />
              <label htmlFor={`radio${num * 4 + index}`}>{item.value}</label>
            </>
          );
        })}
      </div>
    </>
  );
}

export default RadioInput;
