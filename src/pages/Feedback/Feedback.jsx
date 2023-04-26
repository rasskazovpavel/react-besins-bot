import React, { useState, useEffect, useCallback, useRef } from 'react';
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

import { Title, Input, Checkbox, CheckboxTxt } from '../../components';

import useFormValidation from '../../hooks/useFormValidation';
import { useTelegram } from '../../hooks/useTelegram.js';

import './Feedback.css';

// const NUMBER_INPUT_COUNT = 4;

export default function Feedback() {
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
        values['name'] &&
        values['feedback'] &&
        isMobilePhone(values['phone'], 'ru-RU') &&
        isEmail(values['mail']) &&
        check
      );
    };

    if (!checkValidity()) {
      scrollToBottom();
      setIsFormValid(false);
    } else {
      const data = { formType: 'feed', ...values };
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
      text: 'Отправить',
      color: '#4e5994',
    });
  }, [tg.MainButton]);

  // useEffect(() => {
  //   const checkValidity = () => {
  //     return (
  //       !Object.values(values).includes('') &&
  //       Object.keys(values).length === NUMBER_INPUT_COUNT &&
  //       check &&
  //       isEmail(values['mail']) &&
  //       isMobilePhone(values['phone'], 'ru-RU')
  //     );
  //   };

  //   if (checkValidity()) {
  //     tg.MainButton.enable();
  //     tg.MainButton.setParams({
  //       text: 'Отправить',
  //       color: '#4e5994',
  //     });
  //   } else {
  //     tg.MainButton.disable();
  //     tg.MainButton.setParams({
  //       text: 'Отправить',
  //       color: '#858585',
  //     });
  //   }
  // }, [values, tg.MainButton, check]);

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
          <Input
            label="Телефон"
            name="phone"
            onChange={handleChange}
            values={values}
            setValues={setValues}
            type="tel"
            placeholder={'Формат: 89997776655'}
            marked
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

          <span
            className={`feedback__note ${
              !isFormValid && 'feedback__note_visible'
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
