import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormGroup from "./FormGroup";
import TextInput from "./TextInput";
import TextArea from "../components/TextArea";


export default class FormGroupTextArea extends PureComponent {
    static propTypes = {
        label: PropTypes.string,
        formGroupClassName: PropTypes.string,
        labelClassName: PropTypes.string,
        colWidth: PropTypes.number,
        type: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        field: PropTypes.string,
        className: PropTypes.string,
        id: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.props.onChange(value);
    }

    render() {
        const {onChange, colWidth, value, className, id, labelClassName, formGroupClassName, label, field, placeholder, ...rest} = this.props;
        return (
            <FormGroup className={formGroupClassName} htmlFor={id} labelClassName={labelClassName} label={label} colWidth={colWidth}>
                <TextArea className={className}
                          onChange={this.onChange} value={value} field={field}
                          placeholder={placeholder} {...rest}/>
            </FormGroup>
        );
    }
}
