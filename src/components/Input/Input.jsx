import './Input.css';

import arrow from '../../images/arrow.png';

function Input({
  label,
  name,
  onChange,
  values,
  setValues,
  mod,
  type = 'number',
  placeholder,
  marked = false,
  errors,
}) {
  return (
    <div className={`input app__input ${mod && mod}`}>
      <label className="input__label">
        {label}
        {marked && <span className="input__label-required"> *</span>}
      </label>
      <input
        className={`input__field ${errors && errors.includes(name) ? 'input__field_incorrect' : ''}`}
        value={values[name] || ''}
        onChange={onChange}
        min="0"
        placeholder={placeholder ? placeholder : type === 'number' ? '0' : ''}
        name={name}
        required
        type={type}
      />
      {type === 'number' && (
        <div
          className="arrow arrow_up"
          onClick={() => {
            if (values[name] === undefined) {
              setValues({ ...values, [name]: '1' });
            } else {
              setValues({
                ...values,
                [name]: String(Number(values[name]) + 1),
              });
            }
          }}
        >
          <img className="arrow__image" src={arrow} alt="arrow" />
        </div>
      )}
      {type === 'number' && (
        <div
          className="arrow arrow_down"
          onClick={() => {
            setValues({
              ...values,
              [name]: values[name] > 0 ? String(Number(values[name]) - 1) : '0',
            });
          }}
        >
          <img
            className="arrow__image arrow__image_down"
            src={arrow}
            alt="arrow"
          />
        </div>
      )}
    </div>
  );
}

export default Input;
