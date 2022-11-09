import React, { useState } from "react";
import Title from "../../components/Title/Title.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import RadioInput from "../../components/RadioInput/RadioInput.jsx";

import useFormValidation from "../../hooks/useFormValidation";

import {
  greenQuestions,
  greenVariants,
  greenData,
  getIndexGreen,
  getWordEnding,
} from "../../utils/constants";

import "./Green.css";

function Green() {
  const { handleChange, values, isFormValid, setValues } = useFormValidation();
  const [result, setResult] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <>
      {!result && (
        <form
          className="page"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const answersArr = Object.values(values);
            const sum = answersArr.reduce(
              (total, amount) => total + Number(amount),
              0
            );
            setResult(sum);
          }}
        >
          <div className="page__header">
            <Title mod="title_green">
              Оценка тяжести климактерического синдрома по шкале Грина
            </Title>
            <p className="page__green-hint">
              Выберите в каждой строке один вариант ответа и поставьте
              соответствующую цифру в окошке
            </p>
            <p className="page__green-variant">0 - нет симптома</p>
            <p className="page__green-variant">
              1 - слабое проявление симптома
            </p>
            <p className="page__green-variant">
              2 - умеренное проявление симптома
            </p>
            <p className="page__green-variant">
              3 - тяжёлое проявление симптомае
            </p>
            {greenQuestions.map((item, index) => {
              return (
                <RadioInput
                  num={index}
                  key={index}
                  question={item}
                  variants={greenVariants}
                  onChange={handleChange}
                />
              );
            })}
          </div>
          <div className="page__footer">
            <Button valid={isFormValid}>Расчитать</Button>
          </div>
        </form>
      )}
      {result != null && !showMoreInfo && (
        <div className="page">
          <div className="page__header">
            <Title mod="title_center">
              Степень выраженности климактерического синдрома по результатам
              тестирования:
            </Title>
            <h2
              style={{
                color: `${greenData.color[getIndexGreen(result)]}`,
              }}
              className="page__number-result"
            >
              {`${result} балл${getWordEnding(result)}`}
            </h2>
            <p
              style={{
                color: `${greenData.color[getIndexGreen(result)]}`,
              }}
              className="page__text-result"
            >
              {greenData.textVerdict[getIndexGreen(result)]}
            </p>
          </div>
          <div className="page__footer">
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
        <div className="page">
          <div className="page__header">
            <Title mod="title_center">Интерпретация</Title>
            <p className="page__info">
              <span className="colored">{`${result} балл${getWordEnding(
                result
              )}`}</span>
            </p>
            <div className="table">
              <div className="table__column table__column_left">
                {greenData.numberVerdict.map((elem, index) => {
                  return (
                    <p
                      key={index}
                      className={`table__row ${
                        index === getIndexGreen(result) && "colored"
                      }`}
                    >
                      {elem}
                    </p>
                  );
                })}
              </div>

              <div className="table__column table__column_right">
                {greenData.textVerdict.map((elem, index) => {
                  return (
                    <p
                      key={index}
                      className={`table__row ${
                        index === getIndexGreen(result) && "colored"
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

export default Green;
