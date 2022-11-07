import React from "react";
import Title from "../../components/Title/Title.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

import "./Imt.css";

function Imt() {
  return (
    <div className="imt">
      <div className="app__calc">
        <Title>Расчёт индекса массы тела</Title>
        <Input label="Рост, см"></Input>
        <Input label="Вес, кг"></Input>
      </div>
      <div className="imt__footer">
        <Button>Расчитать</Button>
      </div>
    </div>
  );
}

export default Imt;
