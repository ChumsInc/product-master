import React, {PureComponent, Fragment} from 'react';
import {adjustablePropType, dimensionPropType} from "../constants/myPropTypes";
import PropTypes from 'prop-types'
import {DEFAULT_ADJUSTABLE} from "../constants/defaults";
import FormGroupTextInput from "../common-components/FormGroupTextInput";
import classNames from 'classnames';
import {CheckBoxInline} from "../common-components/CheckBox";
import FormGroup from "../common-components/FormGroup";

export default class AdjustableInput extends PureComponent {
    static propTypes = {
        adjustable: adjustablePropType,
        onChange: PropTypes.func.isRequired,
        inline: PropTypes.bool,
        colWidth: PropTypes.number,
    };

    static defaultProps = {
        adjustable: DEFAULT_ADJUSTABLE,
        inline: false,
        colWidth: 0,
    };

    constructor(props) {
        super(props);
        this.onChangeField = this.onChangeField.bind(this);
    }

    onChangeField({field, value}) {
        this.props.onChange({...this.props.adjustable, [field]: value});
    }

    render() {
        const {adjustable, inline, colWidth, onChange, ...rest } = this.props;
        const {isAdjustable, name, min, max, notes} = adjustable;
        const className = (classNames('dimension', {'form-inline': inline}));
        return (
            <div className={className}>
                <FormGroup inline={inline} colWidth={colWidth} label="Adjustable">
                    <CheckBoxInline name="isAdjustable" checked={isAdjustable} onChange={this.onChangeField} {...rest}/>
                </FormGroup>
                {
                    !!isAdjustable && (
                        <Fragment>
                            <FormGroupTextInput inline={inline} colWidth={colWidth} type="text"
                                                onChange={this.onChangeField} value={name} name={'name'}
                                                label="Name" {...rest}/>
                            <FormGroupTextInput inline={inline} colWidth={colWidth} type="number"
                                                onChange={this.onChangeField} value={min} name={'min'}
                                                label="Min" {...rest}/>
                            <FormGroupTextInput inline={inline} colWidth={colWidth} type="number"
                                                onChange={this.onChangeField} value={max} name={'max'}
                                                label="Max" {...rest}/>
                        </Fragment>
                    )
                }
            </div>
        );
    }
}
