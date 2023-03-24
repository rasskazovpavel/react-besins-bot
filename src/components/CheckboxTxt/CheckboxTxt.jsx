import React from 'react';

import './CheckboxTxt.css';

function CheckboxTxt() {
  return (
    <p className="checkbox-txt">
      Я даю согласие на обработку моих персональных данных в соответствии{' '}
      <a
        className="checkbox-txt__link"
        href="https://besins-healthcare.ru/consent/"
        target="_blank"
        rel="noreferrer"
      >
        Политикой об обработке и защите персональных данных
      </a>
    </p>
  );
}

export default CheckboxTxt;
