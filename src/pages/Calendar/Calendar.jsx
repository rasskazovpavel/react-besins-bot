import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title.jsx";
import Button from "../../components/Button/Button.jsx";
import RadioInput from "../../components/RadioInput/RadioInput.jsx";

import useFormValidation from "../../hooks/useFormValidation";

import {
  calendarVariants,
  getIndexIsa,
  isaData,
  formatDate,
  addDays,
  formatDateForDatePicker,
} from "../../utils/constants";

import "./Calendar.css";

let addedDate = null;
const currDate = new Date();

function Calendar() {
  const { handleChange, values, isFormValid, setValues } = useFormValidation();
  const isZeroInInputs = Object.values(values).includes("0");
  const [result, setResult] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [dateValue, setDateValue] = useState(formatDateForDatePicker(currDate));

  return (
    <>
      {!result && (
        <form
          className="page"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            values["type-date"] === "По менструации"
              ? (addedDate = 280)
              : (addedDate = 260);
            const conceptionDate = new Date(dateValue);
            const differenceDays = Math.round(
              Math.abs(
                (conceptionDate.getTime() - currDate.getTime()) /
                  (1000 * 3600 * 24)
              )
            );
            console.log("diff", differenceDays);
            const currWeek =
              Math.ceil(differenceDays / 7) === 0
                ? 1
                : Math.ceil(differenceDays / 7);
            console.log("week", currWeek);
            const birthday = addDays(dateValue, addedDate);
            console.log("birthday", formatDate(birthday));
          }}
        >
          <div className="page__header">
            <Title>Расчёт срока беременности и даты родов</Title>
            <RadioInput
              question="Тип даты"
              variants={calendarVariants}
              onChange={handleChange}
              id="type-date"
            />
            <label className="page__label">Дата</label>
            <input
              className="page__input-date"
              type="date"
              name="date"
              onChange={(e) => setDateValue(e.target.value)}
              value={dateValue}
            />
          </div>
          <div className="page__footer">
            <Button valid={isFormValid && !isZeroInInputs}>Расчитать</Button>
          </div>
        </form>
      )}
      {result != null && !showMoreInfo && (
        <div className="page">
          <div className="page__header">
            <Title mod="title_center">Результат</Title>
            <h2
              style={{
                color: `${
                  isaData[values["gender"]].color[
                    getIndexIsa(values["gender"], result)
                  ]
                }`,
              }}
              className="page__number-result"
            >
              {`${result}%`}
            </h2>
            <p
              style={{
                color: `${
                  isaData[values["gender"]].color[
                    getIndexIsa(values["gender"], result)
                  ]
                }`,
              }}
              className="page__text-result"
            >
              {
                isaData[values["gender"]].textVerdict[
                  getIndexIsa(values["gender"], result)
                ]
              }
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
            <p className="page__info page__info_calendar">
              <span className="colored">ПДР</span> = Первый день последней
              менструации + 280 дней
            </p>
            <p className="page__info page__info_calendar">
              <span className="colored">ПДР</span> = Дата зачатия + 266 дней
            </p>
            <p className="page__info page__info_calendar">
              <span className="colored">Срок беременности</span> = разница в
              днях между первым днем последней менструации и текущей датой
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Calendar;
