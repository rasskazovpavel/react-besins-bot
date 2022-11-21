import React, { useState, useEffect } from "react";
import Title from "../../components/Title/Title.jsx";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";

import useFormValidation from "../../hooks/useFormValidation";

import {
  formatDate,
  addDays,
  formatDateForDatePicker,
} from "../../utils/constants";

import "./OvulationCalendar.css";

let ovulDay = null;
const currDate = new Date();
const NUMBER_INPUT_COUNT = 1;

function OvulationCalendar() {
  const [isDateChanged, setIsDateChanged] = useState(false);
  const { handleChange, values, isFormValid, setIsFormValid, setValues } =
    useFormValidation();
  const [result, setResult] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [dateValue, setDateValue] = useState(formatDateForDatePicker(currDate));

  useEffect(() => {
    !isDateChanged ? setIsFormValid(false) : setIsFormValid(true);
  }, [isDateChanged, setIsFormValid]);

  useEffect(() => {
    if (
      Object.keys(values).length === NUMBER_INPUT_COUNT &&
      !Object.values(values)
        .map((value) => Number(value))
        .includes(0) &&
      isDateChanged
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [values, isDateChanged, setIsFormValid]);

  return (
    <>
      {!showResult && (
        <form
          className="ovulation"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            ovulDay = addDays(dateValue, Number(values["days"]) - 14);
            setResult(formatDate(ovulDay));
            setShowResult(true);
          }}
        >
          <div className="ovulation__header">
            <Title>Календарь овуляции</Title>

            <label className="ovulation__label">
              Первый день последней менструации
            </label>
            <input
              className="ovulation__input-date"
              type="date"
              name="date"
              onChange={(e) => {
                setDateValue(e.target.value);
                setIsDateChanged(values["days"] && true);
              }}
              value={dateValue || ""}
            />
            <Input
              label="Продолжительсть цикла"
              name="days"
              onChange={handleChange}
              values={values}
              setValues={setValues}
              mod="calendar__input"
            />
            <p className="ovulation__note">
              Количество дней (в среднем 28 дней, если Вы не знаете точно, как
              долго длится ваш цикл)
            </p>
          </div>
          <div className="ovulation__footer">
            <Button valid={isFormValid && values["days"]}>Рассчитать</Button>
          </div>
        </form>
      )}
      {showResult && !showMoreInfo && (
        <div className="ovulation">
          <div className="ovulation__header">
            <Title mod="title_center title_calendar">
              Калькулятор овуляции
            </Title>
            <p className="ovulation__date-txt">
              Начало овуляции:{<br></br>}
              <span className="colored">{result}</span>
            </p>
          </div>
          <div className="ovulation__footer">
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
        <div className="ovulation">
          <div className="ovulation__header">
            <Title mod="title_center">Интерпретация</Title>
            <p className="ovulation__info">
              От даты последней менструации –{" "}
              <span className="colored">14 дней</span> (при продолжительности
              цикла 28 дней)
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default OvulationCalendar;
