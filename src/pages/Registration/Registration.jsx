import React, { useState, useEffect, useCallback, useRef } from 'react';
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

import { Title, Input, Checkbox, CheckboxTxt } from '../../components';

import useFormValidation from '../../hooks/useFormValidation';
import { useTelegram } from '../../hooks/useTelegram.js';

import './Registration.css';

// const NUMBER_INPUT_COUNT = 5;

export default function Registration() {
  const [check, setCheck] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const { handleChange, values, setValues } = useFormValidation();
  const { tg } = useTelegram();
  const lastElemForm = useRef(null);

  const scrollToBottom = () =>
    lastElemForm.current?.scrollIntoView({ behavior: 'smooth' });

  const onSendData = useCallback(() => {
    const checkValidity = () => {
      return (
        values['firstName'] &&
        values['lastName'] &&
        isMobilePhone(values['phone'], 'ru-RU') &&
        isEmail(values['mail']) &&
        check
      );
    };

    if (!checkValidity()) {
      scrollToBottom();
      setIsFormValid(false);
    } else {
      const data = { formType: 'reg', ...values };
      tg.sendData(JSON.stringify(data));
    }
  }, [values, tg, check]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.show();
    tg.MainButton.setParams({
      text: 'Зарегистрироваться',
      color: '#4e5994',
    });
  }, [tg.MainButton]);

  // useEffect(() => {
  //   if (checkValidity()) {
  //     tg.MainButton.enable();
  //     tg.MainButton.setParams({
  //       text: 'Зарегистрироваться',
  //       color: '#4e5994',
  //     });
  //   } else {
  //     tg.MainButton.disable();
  //     tg.MainButton.setParams({
  //       text: 'Зарегистрироваться',
  //       color: '#858585',
  //     });
  //   }
  // }, [values, tg.MainButton, check]);

  return (
    <>
      <form
        className="registration"
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="registration__header">
          <Title>Регистрация</Title>
          <Input
            label="Фамилия"
            name="lastName"
            onChange={handleChange}
            values={values}
            setValues={setValues}
            type="string"
            marked
          />
          <Input
            label="Имя"
            name="firstName"
            onChange={handleChange}
            values={values}
            setValues={setValues}
            type="string"
            marked
          />
          <Input
            label="Отчество"
            name="middleName"
            onChange={handleChange}
            values={values}
            setValues={setValues}
            type="string"
          />
          <Input
            label="Номер телефона"
            name="phone"
            onChange={handleChange}
            values={values}
            setValues={setValues}
            type="tel"
            placeholder={'Формат: 89997776655'}
            marked
          />
          <Input
            label="Почта"
            name="mail"
            onChange={handleChange}
            values={values}
            setValues={setValues}
            type="email"
            marked
          />
          <Checkbox
            text={<CheckboxTxt />}
            id="agree"
            name="agree"
            onChange={() => setCheck(!check)}
            value={check}
          />

          <span
            className={`registration__note ${
              !isFormValid && 'registration__error_visible'
            }`}
            ref={lastElemForm}
          >
            Пожалуйста, проверьте правильность заполнения полей, отмеченные
            звездочкой (<span className="marked">*</span>)
          </span>
        </div>
      </form>
    </>
  );
}
