import React, { useState } from 'react';
import { Title, Button, RadioInput } from '../../components';

import useFormValidation from '../../hooks/useFormValidation';

import {
  greenQuestions,
  greenVariants,
  greenData,
  getIndexGreen,
  getWordEnding,
} from '../../utils/constants';

import './Green.css';

function Green() {
  const { handleChange, values, isFormValid } = useFormValidation();
  const [result, setResult] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <>
      {!result && (
        <form
          className="green"
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
          <div className="green__header">
            <Title mod="title_green">
              Оценка тяжести климактерического синдрома по шкале Грина
            </Title>
            <p className="green__hint">
              Выберите в каждой строке один вариант ответа и поставьте
              соответствующую цифру в окошке
            </p>
            <p className="green__variant">0 - нет симптома</p>
            <p className="green__variant">1 - слабое проявление симптома</p>
            <p className="green__variant">2 - умеренное проявление симптома</p>
            <p className="green__variant">3 - тяжёлое проявление симптомае</p>
            {greenQuestions.map((item, index) => {
              return (
                <RadioInput
                  num={index + 1}
                  key={index}
                  question={item}
                  variants={greenVariants}
                  onChange={handleChange}
                />
              );
            })}
          </div>
          <div className="green__footer">
            <Button valid={isFormValid}>Рассчитать</Button>
          </div>
        </form>
      )}
      {result != null && !showMoreInfo && (
        <div className="green">
          <div className="green__header">
            <Title mod="title_center">
              Степень выраженности климактерического синдрома по результатам
              тестирования:
            </Title>
            <h2
              style={{
                color: `${greenData.color[getIndexGreen(result)]}`,
              }}
              className="green__number-result"
            >
              {`${result} балл${getWordEnding(result)}`}
            </h2>
            <p
              style={{
                color: `${greenData.color[getIndexGreen(result)]}`,
              }}
              className="green__text-result"
            >
              {greenData.textVerdict[getIndexGreen(result)]}
            </p>
          </div>
          <div className="green__footer">
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
          <div className="green__header">
            <Title mod="title_center">Интерпретация</Title>
            <p className="green__info">
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
                        index === getIndexGreen(result) && 'colored'
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
                        index === getIndexGreen(result) && 'colored'
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
