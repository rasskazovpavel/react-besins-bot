import React, { useState, useRef, useEffect } from "react";
import Title from "../../components/Title/Title.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

import useFormValidation from "../../hooks/useFormValidation";

import { imtData, getIndexImt } from "../../utils/constants";

import "./Registration.css";
import { useTelegram } from "../../hooks/useTelegram.js";

let barWidth = null;
const NUMBER_INPUT_COUNT = 4;

function Registration() {
  const { handleChange, values, isFormValid, setValues, setIsFormValid } =
    useFormValidation();
  const isZeroInInputs = Object.values(values).includes("0");
  const [result, setResult] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [offsetBar, setOffsetBar] = useState(0);
  const refBar = useRef(null);
  const { tg, onClose, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Зарегистрироваться",
    });
  }, [tg.MainButton]);

  useEffect(() => {
    if (
      Object.keys(values).length === NUMBER_INPUT_COUNT &&
      !Object.values(values)
        .map((value) => Number(value))
        .includes(0)
    ) {
      setIsFormValid(true);
      tg.MainButton.show();
    } else {
      setIsFormValid(false);
      tg.MainButton.hide();
    }
  }, [values, setIsFormValid, tg.MainButton]);

  return (
    <>
      <button onClick={onClose}>Закрыть</button>
      <button onClick={onToggleButton}>Закрыть</button>
      {!result && (
        <form
          className="imt"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const weight = Number(values["weight"]);
            const height = Number(values["height"]);
            const floatRes = weight / (((height / 100) * height) / 100);
            setResult(floatRes.toFixed(2));
            setTimeout(() => {
              barWidth = refBar.current ? refBar.current.offsetWidth : 0;
              if (floatRes > 45) {
                setOffsetBar(barWidth * 0.75);
              } else if (floatRes < 18) {
                setOffsetBar((floatRes / 45) * barWidth * 0.05);
              } else if (floatRes <= 25) {
                setOffsetBar((floatRes / 45) * barWidth * 0.3);
              } else if (floatRes <= 30) {
                setOffsetBar((floatRes / 45) * barWidth * 0.55);
              } else if (floatRes <= 33) {
                setOffsetBar((floatRes / 45) * barWidth * 0.62);
              } else if (floatRes <= 35) {
                setOffsetBar((floatRes / 45) * barWidth * 0.7);
              } else if (floatRes <= 40) {
                setOffsetBar((floatRes / 45) * barWidth * 0.85);
              } else {
                setOffsetBar((floatRes / 45) * barWidth * 0.88);
              }
            }, 200);
          }}
        >
          <div className="imt__header">
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
              type="phone"
            />
          </div>
          <div className="imt__footer">
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
          </div>
        </form>
      )}
      {result && !showMoreInfo && (
        <div className="imt">
          <div className="imt__header">
            <Title mod="title_center">Результат</Title>
            <h2
              style={{ color: `${imtData.color[getIndexImt(result)]}` }}
              className="imt__number-result"
            >
              ИМТ {Math.trunc(result)}
            </h2>
            <p
              style={{ color: `${imtData.color[getIndexImt(result)]}` }}
              className="imt__text-result"
            >
              {imtData.textVerdict[getIndexImt(result)]}
            </p>
            <div className="bars" ref={refBar}>
              <p
                className="bars__result"
                style={{ transform: `translateX(${offsetBar}px)` }}
              >
                {result}
              </p>

              <div className="bar bar_0">
                <div className="bar__scale" />
                <p className="bar__number">18</p>
              </div>
              <div className="bar bar_1">
                <div className="bar__scale" />
                <p className="bar__number">25</p>
              </div>
              <div className="bar bar_2">
                <div className="bar__scale" />
                <p className="bar__number">30</p>
              </div>
              <div className="bar bar_3">
                <div className="bar__scale" />
                <p className="bar__number">35</p>
              </div>
              <div className="bar bar_4">
                <div className="bar__scale" />
                <p className="bar__number">40</p>
              </div>
              <div className="bar bar_5"></div>
            </div>
          </div>
          <div className="imt__footer">
            <Button
              mod="button_transparent"
              handler={() => {
                setShowMoreInfo(true);
              }}
            >
              Подробнее
            </Button>
          </div>
        </div>
      )}
      {showMoreInfo && (
        <div className="imt">
          <div className="imt__header">
            <Title mod="title_center">Интерпретация</Title>
            <p className="imt__info">
              ИМТ = Вес {"("}
              <span className="colored">[{values["weight"]}]</span> / (Рост{" "}
              <span className="colored">[{values["height"]}]</span>)<sup>2</sup>
            </p>
            <div className="table">
              <div className="table__column table__column_left">
                {imtData.numberVerdict.map((elem, index) => {
                  return (
                    <p
                      key={index}
                      className={`table__row ${
                        index === getIndexImt(result) && "colored"
                      }`}
                    >
                      {elem}
                    </p>
                  );
                })}
              </div>
              <div className="table__column table__column_right">
                {imtData.textVerdict.map((elem, index) => {
                  return (
                    <p
                      key={index}
                      className={`table__row ${
                        index === getIndexImt(result) && "colored"
                      }`}
                    >
                      {elem}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Registration;
