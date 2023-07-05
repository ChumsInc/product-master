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
        const {dimensions, inline, hasWeight, hasQuantity, colWidth, onChange, readOnly, placeholder, ...rest} = this.props;
        const {length, width, height, weight, quantity} = dimensions;
        const className = (classNames('dimension', {'row g-3': inline}));
        const volume = calcVolume(dimensions);
        return (
            <div className={className}>
                <div className="col-auto">
                    <label className="form-label">Length</label>
                    <input type="number" className="form-control form-control-sm" value={length || ''}
                           readOnly={readOnly} placeholder="Length"
                           onChange={(ev) => this.onChangeField({field: 'length', value: ev.target.valueAsNumber})}/>
                </div>
                <div className="col-auto">
                    <label className="form-label">Width</label>
                    <input type="number" className="form-control form-control-sm" value={width || ''}
                           readOnly={readOnly} placeholder="Width"
                           onChange={(ev) => this.onChangeField({field: 'width', value: ev.target.valueAsNumber})}/>
                </div>
                <div className="col-auto">
                    <label className="form-label">Height</label>
                    <input type="number" className="form-control form-control-sm" value={height || ''}
                           readOnly={readOnly} placeholder="Height"
                           onChange={(ev) => this.onChangeField({field: 'height', value: ev.target.valueAsNumber})}/>
                </div>
                {!!hasWeight && (
                    <div className="col-auto">
                        <label className="form-label">Weight</label>
                        <input type="number" className="form-control form-control-sm" value={weight || ''}
                               readOnly={readOnly} placeholder="Weight"
                               onChange={(ev) => this.onChangeField({field: 'weight', value: ev.target.valueAsNumber})}/>
                    </div>
                )}
                {!!hasQuantity && (
                    <div className="col-auto">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control form-control-sm" value={quantity || ''}
                               readOnly={readOnly} placeholder="Quantity"
                               onChange={(ev) => this.onChangeField({field: 'quantity', value: ev.target.valueAsNumber})}/>
                    </div>
                )}
                {!!hasQuantity && (
                    <div className="col-auto">
                        <div className="col-auto">
                            <label className="form-label">Unit Volume</label>
                            <input type="number" className="form-control form-control-sm" value={Number(volume).toFixed(4)}
                                   readOnly placeholder="Volume"
                                   onChange={(ev) => this.onChangeField({field: 'volume', value: ev.target.valueAsNumber})}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
