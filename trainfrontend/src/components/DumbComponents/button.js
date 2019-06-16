import React from 'react';

const Button = (props) => {
    
    return (
        <div className="form-group" style={props.style} >
            <div className ="col-sm-2">
                <button
                    className={props.className}
                    onClick={props.action}>
                    {props.title}
                </button>
            </div>
        </div>
    )
}

export default Button;