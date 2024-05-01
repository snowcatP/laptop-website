import React, { useState } from "react";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(false);
  };

  return (
    <div className="formInput" style={{margin: "10px 0"}}>
      <label htmlFor={label}><i className="fa fa-user" /> {label} <span style={{ color: "red" }}>*</span></label>
      <input
        className="input"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => setFocused(true)}
        focused={focused.toString()}
      />

        {focused === true && 
            <span className="error-message">{errorMessage}</span>
        }
    </div>
  );
};

export default FormInput;
