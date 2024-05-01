import React from "react";
import { useState } from "react";

const PasswordInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(false);
  };
  return (
    <>
      <div className="row mb-3" style={{ paddingBottom: "1em" }}>
        <label className="col-sm-4 col-form-label">
          {label}
        </label>
        <div className="col-sm-7">
          <input
            className="form-control"
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            onFocus={() => setFocused(true)}
            focused={focused.toString()}
          />
          {focused === true && (
            <span className="error-message">{errorMessage}</span>
          )}
        </div>
        <div className="col-sm-1" />
      </div>
    </>
  );
};

export default PasswordInput;
