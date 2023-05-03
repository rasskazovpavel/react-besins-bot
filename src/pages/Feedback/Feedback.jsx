import React, { useState, useEffect, useCallback } from 'react';
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

import { Title, Input, Checkbox, CheckboxTxt } from '../../components';

import useFormValidation from '../../hooks/useFormValidation';
import { useTelegram } from '../../hooks/useTelegram.js';

import './Feedback.css';

export default function Feedback() {
  const [check, setCheck] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const { handleChange, values, setValues } = useFormValidation();
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    // const checkValidity = () => {
    //   return (
    //     values['name'] &&
    //     values['feedback'] &&
    //     isMobilePhone(values['phone'], 'ru-RU') &&
    //     isEmail(values['mail']) &&
    //     check
    //   );
    // };

    const checkValidity = () => {
      const errorsArr = [];
      if (!values['name']) {
        errorsArr.push('name');
      }
      if (!values['feedback']) {
        errorsArr.push('feedback');
      }
      if ((values['mail'] && !isEmail(values['mail'])) || !values['mail']) {
        errorsArr.push('mail');
      }
      if (
        (values['phone'] && !isMobilePhone(values['phone'], 'ru-RU')) ||
        !values['phone']
      ) {
        errorsArr.push('phone');
      }
      if (!check) errorsArr.push('agree');
      setErrors(errorsArr);
      if (errorsArr.length === 0 && check) {
        return true;
      } else {
        return false;
      }
    };

    if (checkValidity()) {
      console.log('Valid');
      setIsFormValid(true);
      const data = { formType: 'feed', ...values };
      tg.sendData(JSON.stringify(data));
    } else {
      console.log('Invalid');
      setIsFormValid(false);
    }
  }, [values, tg, check]);

  useEffect(() => {
    if (!isFormValid) {
      const offset =
      document.querySelector('.input__field_incorrect')?.getBoundingClientRect()
        ?.top +
      window.pageYOffset -
      40;
    window.scrollTo(0, offset);
    }
    
  }, [errors, isFormValid]);

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
            errors={errors}
          />
          <Input
            label="Почта"
            name="mail"
            onChange={handleChange}
            values={values}
            setValues={setValues}
            type="email"
            marked
            errors={errors}
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
            errors={errors}
          />
          <div className="textarea">
            <label className="textarea__label">Сообщение</label>
            <textarea
              className={`textarea__field ${
                errors.includes('feedback') ? 'input__field_incorrect' : ''
              }`}
              name="feedback"
              values={values}
              onChange={handleChange}
            />
          </div>
          <Checkbox
            text={<CheckboxTxt />}
            id="agree"
            name="agree"
            onChange={() => setCheck(!check)}
            value={check}
            errors={errors}
          />

          <span
            className={`feedback__note ${
              errors.length && 'feedback__note_visible'
            }`}
          >
            Пожалуйста, проверьте правильность заполнения полей, отмеченные
            звездочкой (<span className="marked">*</span>)
          </span>
        </div>
      </form>
    </>
  );
}
