import React, { useState, useEffect } from 'react';
import { Title, Button, Checkbox } from '../../components';

import useFormValidationRadio from '../../hooks/useFormValidationRadio';

import {
  vteoQuestions,
  getWordEnding,
  getIndexVteo,
  vteoData,
} from '../../utils/constants';

import './Vteo.css';

function removeObjOffKeys(object) {
  for (let key in object) {
    if (object[key] === 'off') {
      delete object[key];
    }
  }
  return object;
}

function Vteo() {
  const { handleChange, values, isFormValid, setIsFormValid } =
    useFormValidationRadio();
  const [result, setResult] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    Object.values(values).includes('on')
      ? setIsFormValid(true)
      : setIsFormValid(false);
  }, [values, setIsFormValid]);

  return (
    <>
      {!result && (
        <form
          className="vteo"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const onObjkey = removeObjOffKeys(values);
            const tempArrayKeys = Object.keys(onObjkey);
            const arrWithPoints = tempArrayKeys.map((key) =>
              Number(key.split('-')[1])
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
            <Button valid={isFormValid}>Расчитать</Button>
          </div>
        </form>
      )}{' '}
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
                        index === getIndexVteo(result) && 'colored'
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
                        index === getIndexVteo(result) && 'colored'
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
