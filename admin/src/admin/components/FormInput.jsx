import React, { useState } from "react";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(false);
  };

  return (
    <>
      <div className="col-12" style={{margin: "10px 0"}}>
        <label htmlFor={label} className="form-label"><i className="bi bi-person-fill"/> {label} <span style={{ color: "red" }}>*</span></label>
        <div className="input-group">
          <input
            className="input form-control"
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            onFocus={() => setFocused(true)}
            focused={focused.toString()}
          />
          
        </div>
          {focused && 
            <span className="error-message" style={{color: "red", display:"block"}}>{errorMessage}</span>
          }
      </div>
      
    </>
  );
};

export default FormInput
