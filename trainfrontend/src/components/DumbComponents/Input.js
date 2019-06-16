import React from 'react';


const Input = (props) => {
  return (
    <div className="form-group row">
      <label htmlFor={props.name} className="col-md-4 col-form-label">{props.title}</label>
      <div className="col-md-3" >
        <input
          className="form-control input-md"
          style={props.style}
          id={props.name}
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={props.handleChange}
          placeholder={props.placeholder}
        />

      </div>
    </div>
  )
}

export default Input;
