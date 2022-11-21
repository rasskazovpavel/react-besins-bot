import { useState, useEffect } from "react";

export function useFormValidationRadio() {
  const [values, setValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => console.log("Values", values), [values]);

  const handleChange = (e) => {
    const { name } = e.target;
    setValues({
      ...values,
      [name]: values[name] && values[name] === "on" ? "off" : "on",
    });

    setIsFormValid(e.target.closest("form").checkValidity());
  };

  return {
    handleChange,
    values,
    isFormValid,
    setValues,
    setIsFormValid,
  };
}

export default useFormValidationRadio;
