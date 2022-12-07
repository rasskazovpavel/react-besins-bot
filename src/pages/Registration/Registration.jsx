import React, { useState, useEffect, useCallback } from "react";
import isEmail from "validator/es/lib/isEmail";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import Title from "../../components/Title/Title.jsx";
import Input from "../../components/Input/Input.jsx";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";

import useFormValidation from "../../hooks/useFormValidation";

import "./Registration.css";
import { useTelegram } from "../../hooks/useTelegram.js";

const NUMBER_INPUT_COUNT = 5;

function Registration() {
  const [check, setCheck] = useState(false);
  const { handleChange, values, setValues } = useFormValidation();
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = values;
    tg.sendData(JSON.stringify(data));
  }, [values, tg]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Зарегистрироваться",
      color: "#4e5994",
    });
  }, [tg.MainButton]);

  useEffect(() => {
    const checkValidity = () => {
      return (
        Object.keys(values).length === NUMBER_INPUT_COUNT &&
        check &&
        isEmail(values["mail"]) &&
        isMobilePhone(values["phone"], "ru-RU")
      );
    };

    checkValidity() ? tg.MainButton.show() : tg.MainButton.hide();
  }, [values, tg.MainButton, check]);

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
          />
          <Input
            label="Имя"
            name="firstName"
            onChange={handleChange}
            values={values}
            setValues={setValues}
            type="string"
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
          />
          <Input
            label="Почта"
            name="mail"
            onChange={handleChange}
            values={values}
            setValues={setValues}
            type="email"
          />
          <Checkbox
            text="Даю согласие на обработку персональных данных"
            id="agree"
            name="agree"
            onChange={() => setCheck(!check)}
            value={check}
          />
        </div>
        {/* <div className="registration__footer">
            <Button valid={isFormValid && !isZeroInInputs}>
              Зарегистрироваться
            </Button>
            <Button
              valid={Object.values(values).length !== 0}
              handler={() => {
                setValues({});
                setIsFormValid(false);
              }}
              type="button"
            >
              Очистить
            </Button>
          </div> */}
      </form>
    </>
  );
}

export default Registration;
