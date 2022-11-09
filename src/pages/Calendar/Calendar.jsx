import React, { useEffect, useState, useRef } from "react";
import Title from "../../components/Title/Title.jsx";
import Button from "../../components/Button/Button.jsx";
import RadioInput from "../../components/RadioInput/RadioInput.jsx";

import useFormValidation from "../../hooks/useFormValidation";

import {
  calendarVariants,
  formatDate,
  addDays,
  formatDateForDatePicker,
  getWeekWord,
} from "../../utils/constants";

import "./Calendar.css";

let addedDate = null;
let progress = null;
let barWidth = null;
const currDate = new Date();

function Calendar() {
  const { handleChange, values, isFormValid, setValues, setIsFormValid } =
    useFormValidation();
  const isZeroInInputs = Object.values(values).includes("0");
  const [result, setResult] = useState({});
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [dateValue, setDateValue] = useState(formatDateForDatePicker(currDate));
  const [widthBar, setWidthBar] = useState(1);
  const refBar = useRef(null);

  return (
    <>
      {Object.values(result) == 0 && (
        <form
          className="page"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            values["type-date"] === "По менструации"
              ? (addedDate = 280)
              : (addedDate = 266);
            const conceptionDate = new Date(dateValue);
            let differenceDays = Math.ceil(
              Math.abs(
                (conceptionDate.getTime() - currDate.getTime()) /
                  (1000 * 3600 * 24)
              )
            );
            if (values["type-date"] === "По дате зачатия") {
              differenceDays += 14;
            }
            progress = differenceDays / 280;
            const currWeek =
              Math.ceil(differenceDays / 7) === 0
                ? 1
                : Math.ceil(differenceDays / 7);
            const birthday = addDays(dateValue, addedDate);
            setResult({
              week: currWeek,
              birthday: formatDate(birthday),
              days: differenceDays,
            });

            setTimeout(() => {
              barWidth = refBar.current ? refBar.current.offsetWidth : 0;
              setWidthBar(barWidth * progress);
            }, 200);
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
            <Button valid={isFormValid && !isZeroInInputs}>Рассчитать</Button>
          </div>
        </form>
      )}
      {Object.values(result) != 0 && !showMoreInfo && (
        <div className="page">
          <div className="page__header">
            <Title mod="title_center title_calendar">
              Рассчитать срок беременности и дату родов
            </Title>
            <div className="date-bar" ref={refBar}>
              <p className="date-bar__text">
                {progress * 100 < 1 ? 1 : Math.floor(progress * 100)}% (
                {result.days} из 280 дней)
              </p>
              <div style={{ width: widthBar }} className="date-bar__progress" />
            </div>
            <p className="page__date-txt">
              Предполагаемая дата родов:{" "}
              <span className="colored">{result.birthday}</span>
            </p>
            <p className="page__date-txt">
              Срок беременности:{" "}
              <span className="colored">
                {result.week} {getWeekWord(result.week)}
              </span>
            </p>
            <p className="page__date-txt page__date-txt_caps colored">
              {result.week}-я неделя беременности
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
