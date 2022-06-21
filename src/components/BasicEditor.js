import React, {Fragment} from 'react';
import FormGroupTextInput from "../common-components/FormGroupTextInput";
import FormGroupTextArea from "../common-components/FormGroupTextArea";
import FormGroup from "../common-components/FormGroup";
import StatusToggleButtonGroup from "../common-components/StatusToggleButtonGroup";
import Alert from "./Alert";

const BasicEditor = ({id = 0, code = '', description = '', notes = '', active = false, changed = false, children, onChange, onSubmit}) => {
    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <FormGroupTextInput onChange={onChange} value={id} readOnly colWidth={8} label="ID"/>
                <FormGroupTextInput onChange={onChange} value={code} field="code" colWidth={8} label="Code"/>
                <FormGroupTextInput onChange={onChange} value={description} field="description" colWidth={8} label="Description"/>
                <FormGroupTextArea onChange={onChange} value={notes} field="notes" colWidth={8} label="Notes" />
                {children}
                <FormGroup colWidth={8} label="Status">
                    <StatusToggleButtonGroup onClick={onChange} field="active" value={active} labelFalse="Disabled" labelTrue="Enabled" />
                </FormGroup>
                <FormGroup colWidth={8} label="">
                    <button type="submit" className="btn btn-primary btn-sm">Save</button>
                </FormGroup>
            </form>
            {!!changed && (<Alert type={'warning'} message="Don't forget to save your changes." />)}
        </Fragment>
    )
}

export default BasicEditor;
