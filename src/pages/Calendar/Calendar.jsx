import React, { useState, useRef, useEffect } from "react";
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

let addedDays = null;
let progress = null;
let currWeek = null;
let birthday = null;
let barWidth = null;
const currDate = new Date();

function Calendar() {
  const [isDateChanged, setIsDateChanged] = useState(false);
  const { handleChange, values, isFormValid, setIsFormValid } =
    useFormValidation(isDateChanged);
  const [result, setResult] = useState({});
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showWeekResult, setShowWeekResult] = useState(false);
  const [dateValue, setDateValue] = useState(formatDateForDatePicker(currDate));
  const [widthBar, setWidthBar] = useState(1);
  const refBar = useRef(null);

  useEffect(() => {
    !isDateChanged ? setIsFormValid(false) : setIsFormValid(true);
  }, [isDateChanged, setIsFormValid]);

  return (
    <>
      {!showResult && (
        <form
          className="calendar"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const conceptionDate = new Date(dateValue);
            // Вычисляем др
            values["type-date"] === "По менструации"
              ? (addedDays = 280)
              : (addedDays = 266);
            birthday = addDays(dateValue, addedDays);

            let differenceDays = Math.ceil(
              (conceptionDate.getTime() - currDate.getTime()) /
                (1000 * 3600 * 24)
            );
            if (differenceDays < 0) {
              console.log("Выбрана прошедшая дата");
              if (values["type-date"] === "По дате зачатия") {
                differenceDays -= 14;
              }
              // Ребенок уже родился
              if (differenceDays < -280) {
                setShowWeekResult(false);
                progress = 1;
                currWeek = null;
                differenceDays = 280;
              } else {
                setShowWeekResult(true);
                progress = Math.abs(differenceDays / 280);
                console.log(Math.ceil(differenceDays / 7));
                currWeek =
                  Math.ceil(Math.abs(differenceDays / 7)) === 0
                    ? 1
                    : Math.ceil(Math.abs(differenceDays / 7));
                differenceDays = Math.abs(differenceDays);
              }
            } else if (differenceDays === 0) {
              setShowWeekResult(true);
              console.log("Выбрана сегодняшняя дата");
              progress = 0;
              currWeek = 1;
              differenceDays = 1;
            } else {
              setShowWeekResult(false);
              console.log("Выбрана будущая дата");
              progress = null;
              currWeek = null;
              differenceDays = 0;
            }

            setResult({
              ...result,
              birthday: formatDate(birthday),
              week: currWeek,
              days: differenceDays,
            });
            setShowResult(true);

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
              onChange={(e) => {
                setDateValue(e.target.value);
                setIsDateChanged(values["type-date"] && true);
              }}
              value={dateValue || ""}
            />
          </div>
          <div className="calendar__footer">
            <Button valid={isFormValid && values["type-date"]}>
              Рассчитать
            </Button>
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
                {Math.floor(progress * 100)}% ({result.days} из 280 дней)
              </p>
              <div style={{ width: widthBar }} className="date-bar__progress" />
            </div>
            <p className="calendar__date-txt">
              Предполагаемая дата родов:{<br></br>}
              <span className="colored">{result.birthday} г.</span>
            </p>
            {showWeekResult && (
              <p className="calendar__date-txt">
                Срок беременности:{" "}
                <span className="colored">
                  {result.week} {getWeekWord(result.week)}
                </span>
              </p>
            )}
            {showWeekResult && (
              <p className="calendar__date-txt calendar__date-txt_caps colored">
                {result.week}-я неделя беременности
              </p>
            )}
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
