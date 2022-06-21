import React, {PureComponent} from 'react';
import {dimensionPropType} from "../constants/myPropTypes";
import PropTypes from 'prop-types'
import FormGroupTextInput from "../common-components/FormGroupTextInput";
import classNames from 'classnames';
import {calcVolume, noop} from "../utils/general";
import {DEFAULT_DIMENSION} from "../constants/defaults";

export default class DimensionInput extends PureComponent {
    static propTypes = {
        dimensions: dimensionPropType,
        onChange: PropTypes.func.isRequired,
        hasWeight: PropTypes.bool,
        hasQuantity: PropTypes.bool,
        inline: PropTypes.bool,
        colWidth: PropTypes.number,
    };

    static defaultProps = {
        dimensions: DEFAULT_DIMENSION,
        inline: false,
        hasWeight: false,
        hasQuantity: false,
        colWidth: 0,
    };

    constructor(props) {
        super(props);
        this.onChangeField = this.onChangeField.bind(this);
    }

    onChangeField({field, value}) {
        this.props.onChange({...this.props.dimensions, [field]: value});
    }

    render() {
        const {dimensions, inline, hasWeight, hasQuantity, colWidth, onChange, ...rest} = this.props;
        const {length, width, height, weight, quantity} = dimensions;
        const className = (classNames('dimension', {'form-inline': inline}));
        const volume = calcVolume(dimensions);
        return (
            <div className={className}>
                <FormGroupTextInput inline={inline} colWidth={colWidth} type="number" step="any"
                                    value={length || ''} field={'length'} label="Length"
                                    onChange={this.onChangeField} {...rest} />
                <FormGroupTextInput inline={inline} colWidth={colWidth} type="number" step="any"
                                    value={width || ''} field={'width'} label="Width"
                                    onChange={this.onChangeField} {...rest}/>
                <FormGroupTextInput inline={inline} colWidth={colWidth} type="number" step="any"
                                    value={height || ''} field={'height'} label="Depth"
                                    onChange={this.onChangeField} {...rest}/>
                {!!hasWeight && <FormGroupTextInput inline={inline} colWidth={colWidth} type="number" step="any"
                                                    value={weight || ''} field={'weight'} label="Weight"
                                                    onChange={this.onChangeField} {...rest}/>}
                {!!hasQuantity && <FormGroupTextInput inline={inline} colWidth={colWidth} type="number" step="any"
                                                      value={quantity || ''} field={'quantity'} label="Quantity"
                                                      onChange={this.onChangeField} {...rest}/>}
                {!!hasQuantity && <FormGroupTextInput inline={inline} colWidth={colWidth} type="number"
                                                      value={Number(volume).toFixed(4)}
                                                      readOnly onChange={noop} label="Unit Volume" />}
            </div>
        );
    }
}
