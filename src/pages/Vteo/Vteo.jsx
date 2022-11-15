import React, { useState } from "react";
import Title from "../../components/Title/Title.jsx";
import Button from "../../components/Button/Button.jsx";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";

import useFormValidation from "../../hooks/useFormValidation";

import {
  vteoQuestions,
  getWordEnding,
  getIndexVteo,
  vteoData,
} from "../../utils/constants";

import "./Vteo.css";

function Vteo() {
  const { handleChange, values, isFormValid } = useFormValidation();
  const isZeroInInputs = Object.values(values).includes("0");
  const [result, setResult] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <>
      {!result && (
        <form
          className="vteo"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const tempArrayKeys = Object.keys(values);
            const arrWithPoints = tempArrayKeys.map((key) =>
              Number(key.split("-")[1])
            );
            const sum = arrWithPoints.reduce(
              (total, amount) => total + Number(amount),
              0
            );
            setResult(sum);
          }}
        >
          <div className="vteo__header">
            <Title mod="title_vteo">
              Шкала оценки риска ВТЭО (Венозных тромбоэмболических осложнений) у
              нехирургических больных (шкала Падуа)
            </Title>
            <p className="vteo__hint">
              Выберите, из перечисленного ниже то, что релевантно для пациента
            </p>
            {vteoQuestions.map((item) => {
              return (
                <Checkbox
                  key={item.id}
                  text={item.text}
                  id={item.id}
                  onChange={handleChange}
                  value={`check${item.id}-${item.value}`}
                />
              );
            })}
          </div>
          <div className="vteo__footer">
            <Button valid={isFormValid && !isZeroInInputs}>Расчитать</Button>
          </div>
        </form>
      )}{" "}
      {result && !showMoreInfo && (
        <div className="vteo">
          <div className="vteo__header">
            <Title mod="title_center">Результат</Title>
            <h2
              style={{
                color: `${vteoData.color[getIndexVteo(result)]}`,
              }}
              className="vteo__number-result"
            >
              {`${result} балл${getWordEnding(result)}`}
            </h2>
            <p
              style={{
                color: `${vteoData.color[getIndexVteo(result)]}`,
              }}
              className="vteo__text-result"
            >
              {vteoData.textVerdict[getIndexVteo(result)]}
            </p>
          </div>
          <div className="vteo__footer">
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
        <div className="vteo">
          <div className="vteo__header">
            <Title mod="title_center">Интерпретация</Title>
            <p className="vteo__info">
              <span className="colored">{`${result} балл${getWordEnding(
                result
              )}`}</span>
            </p>
            <div className="table">
              <div className="table__column table__column_left table__column_homa">
                {vteoData.numberVerdict.map((elem, index) => {
                  return (
                    <p
                      key={index}
                      className={`table__row table__row_hypertens ${
                        index === getIndexVteo(result) && "colored"
                      }`}
                    >
                      {elem}
                    </p>
                  );
                })}
              </div>
              <div className="table__column table__column_right">
                {vteoData.textVerdict.map((elem, index) => {
                  return (
                    <p
                      key={index}
                      className={`table__row table__row_hypertens ${
                        index === getIndexVteo(result) && "colored"
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

export default Vteo;
