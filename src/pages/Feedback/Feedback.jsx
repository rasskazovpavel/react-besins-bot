import React, { useState, useEffect, useCallback } from 'react';
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

import { Title, Input, Checkbox, CheckboxTxt } from '../../components';

import useFormValidation from '../../hooks/useFormValidation';
import { useTelegram } from '../../hooks/useTelegram.js';

import './Feedback.css';

const NUMBER_INPUT_COUNT = 4;

export default function Feedback() {
  const [check, setCheck] = useState(false);
  const { handleChange, values, setValues } = useFormValidation();
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = { formType: 'feed', ...values };
    tg.sendData(JSON.stringify(data));
  }, [values, tg]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.show();
    tg.MainButton.setParams({
      text: 'Отправить',
      color: '#4e5994',
    });
  }, [tg.MainButton]);

  useEffect(() => {
    const checkValidity = () => {
      return (
        !Object.values(values).includes('') &&
        Object.keys(values).length === NUMBER_INPUT_COUNT &&
        check &&
        isEmail(values['mail']) &&
        isMobilePhone(values['phone'], 'ru-RU')
      );
    };

    if (checkValidity()) {
      tg.MainButton.enable();
      tg.MainButton.setParams({
        text: 'Отправить',
        color: '#4e5994',
      });
    } else {
      tg.MainButton.disable();
      tg.MainButton.setParams({
        text: 'Отправить',
        color: '#858585',
      });
    }
  }, [values, tg.MainButton, check]);

  return (
    <>
      <form
        className="feedback"
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="feedback__header">
          <Title>Форма обратной связи</Title>
          <Input
            label="Имя"
            name="name"
            onChange={handleChange}
            values={values}
            setValues={setValues}
            type="string"
          />
          <Input
            label="Почта"
            name="mail"
            onChange={handleChange}
            values={values}
            setValues={setValues}
            type="email"
          />
          <Input
            label="Телефон"
            name="phone"
            onChange={handleChange}
            values={values}
            setValues={setValues}
            type="tel"
            placeholder={'Формат: 89997776655'}
          />
          <div className="textarea">
            <label className="textarea__label">Сообщение</label>
            <textarea
              className="textarea__field"
              name="feedback"
              values={values}
              setValues={setValues}
              onChange={handleChange}
            />
          </div>
          <Checkbox
            text={<CheckboxTxt />}
            id="agree"
            name="agree"
            onChange={() => setCheck(!check)}
            value={check}
          />
        </div>
      </form>
    </>
  );
}
