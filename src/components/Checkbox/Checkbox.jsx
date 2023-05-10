import React from 'react';

import './Checkbox.css';

const Checkbox = ({ text, id, onChange, value, name, errors }) => {
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
      <span
        className={`checkbox__mark ${
          errors && errors.includes(name) && !value ? 'input__field_incorrect' : ''
        }`}
      ></span>
    </label>
  );
};

export default Checkbox;
