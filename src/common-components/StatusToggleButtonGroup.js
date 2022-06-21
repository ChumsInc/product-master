import React from 'react';
import ToggleButton, {buttonStyles} from "./ToggleButton";

const StatusToggleButtonGroup = ({value, labelTrue = 'On', labelFalse = 'Off', field, onClick}) => {
    return (
        <div className="btn-group btn-group-sm">
            <ToggleButton state={value} onClick={() => onClick({field, value: true})} style={buttonStyles.success}
                          label={labelTrue}/>
            <ToggleButton state={!value} onClick={() => onClick({field, value: false})} style={buttonStyles.danger}
                          label={labelFalse}/>
        </div>
    )
};

export default StatusToggleButtonGroup;
