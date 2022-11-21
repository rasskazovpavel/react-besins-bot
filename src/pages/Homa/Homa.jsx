import React, { useState, useEffect } from "react";
import Title from "../../components/Title/Title.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

import useFormValidation from "../../hooks/useFormValidation";

import { homaData, getIndexHoma } from "../../utils/constants";

import "./Homa.css";

const NUMBER_INPUT_COUNT = 2;

function Homa() {
  const { handleChange, values, isFormValid, setValues, setIsFormValid } =
    useFormValidation();
  const isZeroInInputs = Object.values(values).includes("0");
  const [result, setResult] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    if (
      Object.keys(values).length === NUMBER_INPUT_COUNT &&
      !Object.values(values)
        .map((value) => Number(value))
        .includes(0)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [values, setIsFormValid]);

  return (
    <>
      {!result && (
        <form
          className="homa"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const glucose = Number(values["glucose"]);
            const insulin = Number(values["insulin"]);
            const floatRes = (glucose * insulin) / 22.5;
            setResult(floatRes.toFixed(1));
          }}
        >
          <div className="homa__header">
            <Title>Расчёт индекса инсулинорезистентности (HOMA-IR)</Title>
            <Input
              label="Глюкоза натощак, ммоль/л"
              name="glucose"
              onChange={handleChange}
              values={values}
              setValues={setValues}
            />
            <Input
              label="Инсулин натощак, мкЕд/мл"
              name="insulin"
              onChange={handleChange}
              values={values}
              setValues={setValues}
            />
          </div>
          <div className="homa__footer">
            <Button valid={isFormValid && !isZeroInInputs}>Рассчитать</Button>
            <Button
              valid={Object.values(values).length !== 0}
              handler={() => {
                setValues({});
                setIsFormValid(false);
              }}
              type="button"
            >
              Oчистить
            </Button>
          </div>
        </form>
      )}
      {result && !showMoreInfo && (
        <div className="homa">
          <div className="homa__header">
            <Title mod="title_center">Результат</Title>
            <h2
              style={{ color: `${homaData.color[getIndexHoma(result)]}` }}
              className="homa__number-result"
            >
              HOMA-IR = {result}
            </h2>
            <p
              style={{ color: `${homaData.color[getIndexHoma(result)]}` }}
              className="homa__text-result"
            >
              {homaData.textVerdict[getIndexHoma(result)]}
            </p>
          </div>
          <div className="homa__footer">
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
        <div className="homa">
          <div className="homa__header">
            <Title mod="title_center">Интерпретация</Title>
            <p className="homa__info">
              HOMA-IR = {"("}Инсулин{" "}
              <span className="colored">[{values["glucose"]}]</span> x Глюкоза
              натощак <span className="colored">[{values["insulin"]}]</span> /
              22,5
            </p>
            <div className="table">
              <div className="table__column table__column_left table__column_homa">
                {homaData.numberVerdict.map((elem, index) => {
                  return (
                    <p
                      key={index}
                      className={`table__row ${
                        index === getIndexHoma(result) && "colored"
                      }`}
                    >
                      {elem}
                    </p>
                  );
                })}
              </div>
              <div className="table__column table__column_right">
                {homaData.textVerdict.map((elem, index) => {
                  return (
                    <p
                      key={index}
                      className={`table__row ${
                        index === getIndexHoma(result) && "colored"
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

export default Homa;
