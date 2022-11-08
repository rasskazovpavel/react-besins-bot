import React from "react";
import "./Title.css";

function Title({ children, mod }) {
  return <div className={`title app__title ${mod}`}>{children}</div>;
}

export default Title;
