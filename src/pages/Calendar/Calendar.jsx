import React, { useState, useRef } from "react";
import Title from "../../components/Title/Title.jsx";
import Button from "../../components/Button/Button.jsx";
import RadioInput from "../../components/RadioInput/RadioInput.jsx";

import useFormValidation from "../../hooks/useFormValidation";

import {
  calendarVariants,
  formatDate,
  addDays,
  getWeekWord,
  formatDateForDatePicker,
} from "../../utils/constants";

import "./Calendar.css";

let addedDate = null;
let progress = null;
let barWidth = null;
const currDate = new Date();

function Calendar() {
  const { handleChange, values, isFormValid } = useFormValidation();
  const isZeroInInputs = Object.values(values).includes("0");
  const [result, setResult] = useState({});
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [dateValue, setDateValue] = useState(formatDateForDatePicker(currDate));
  const [widthBar, setWidthBar] = useState(1);
  const refBar = useRef(null);

  return (
    <>
      {!showResult && (
        <form
          className="calendar"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            setShowResult(true);
            values["type-date"] === "По менструации"
              ? (addedDate = 280)
              : (addedDate = 266);
            const conceptionDate = new Date(dateValue);
            console.log("conceptionDate", conceptionDate);
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
            console.log("123", birthday.toLocaleDateString());

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
          <div className="calendar__header">
            <Title>Расчёт срока беременности и даты родов</Title>
            <RadioInput
              question="Тип даты"
              variants={calendarVariants}
              onChange={handleChange}
              id="type-date"
            />
            <label className="calendar__label">Дата</label>
            <input
              className="calendar__input-date"
              type="date"
              name="date"
              onChange={(e) => setDateValue(e.target.value)}
              value={dateValue || ""}
            />
          </div>
          <div className="calendar__footer">
            <Button valid={isFormValid && !isZeroInInputs}>Рассчитать</Button>
          </div>
        </form>
      )}
      {showResult && !showMoreInfo && (
        <div className="calendar">
          <div className="calendar__header">
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
            <p className="calendar__date-txt">
              Предполагаемая дата родов:{" "}
              <span className="colored">{result.birthday} г.</span>
            </p>
            <p className="calendar__date-txt">
              Срок беременности:{" "}
              <span className="colored">
                {result.week} {getWeekWord(result.week)}
              </span>
            </p>
            <p className="calendar__date-txt calendar__date-txt_caps colored">
              {result.week}-я неделя беременности
            </p>
          </div>
          <div className="calendar__footer">
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
        <div className="calendar">
          <div className="calendar__header">
            <Title mod="title_center">Интерпретация</Title>
            <p className="calendar__info calendar__info_calendar">
              <span className="colored">ПДР</span> = Первый день последней
              менструации + 280 дней
            </p>
            <p className="calendar__info calendar__info_calendar">
              <span className="colored">ПДР</span> = Дата зачатия + 266 дней
            </p>
            <p className="calendar__info calendar__info_calendar">
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
