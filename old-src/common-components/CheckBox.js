import React from 'react';

export const CheckBoxInline = ({checked = false, label, field, onChange, readOnly = false}) => {
    return (
        <CheckBox checked={checked} label={label} field={field} onChange={onChange} className={'form-check-inline'} readOnly={readOnly}/>
    )
};

const CheckBox = ({checked, label, field, onChange, className = 'form-check', readOnly = false}) => {
    return (
        <div className={className}>
            <input type="checkbox" className="form-check-input" checked={checked === true} readOnly={readOnly} disabled={readOnly}
                   onChange={() => onChange({field, value: !checked})}/>
            <label className="form-check-label"
                   onClick={() => !readOnly && onChange({field, value: !checked})}>
                {label}
            </label>
        </div>
    )
};

export default CheckBox;
