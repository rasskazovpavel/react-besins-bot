import { useState, useEffect } from "react";

export function useFormValidation(injectValid = true) {
  const [values, setValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setIsFormValid(e.target.closest("form").checkValidity() && injectValid);
  };

  return {
    handleChange,
    values,
    isFormValid,
    setValues,
    setIsFormValid,
  };
}

export default useFormValidation;
