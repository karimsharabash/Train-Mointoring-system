import React from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const techCompanies = [
    { label: "Apple", value: 1 },
    { label: "Facebook", value: 2 },
    { label: "Netflix", value: 3 },
    { label: "Tesla", value: 4 },
    { label: "Amazon", value: 5 },
    { label: "Alphabet", value: 6 },
];

const DropDownMenu = (props) => {
    return (
        <div className="form-group row">
            <label htmlFor={props.name} className="col-md-4 col-form-label">{props.title}</label>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Select 
                            value={props.value}
                            name={props.name}
                            onChange={props.handleChange}
                            options={techCompanies} />
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
    )
}

export default DropDownMenu