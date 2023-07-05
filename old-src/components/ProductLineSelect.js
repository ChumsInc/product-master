import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from "../common-components/Select";

export default class ProductLineSelect extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        field: PropTypes.string,
        productLines: PropTypes.arrayOf(
            PropTypes.shape({
                ProductLine: PropTypes.string.isRequired,
                ProductLineDesc: PropTypes.string.isRequired,
                ProductType: PropTypes.string.isRequired,
            })
        ).isRequired,
        onChange: PropTypes.func.isRequired,
        includeAll: PropTypes.bool,
        includeDiscontinued: PropTypes.bool,
        productType: PropTypes.string,
    };

    static defaultProps = {
        value: '',
        productLines: [],
        includeAll: false,
        includeDiscontinued: false,
        productType: null,
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange({field, value}) {
        this.props.onChange({field, value});
    }

    render() {
        const {value, field, includeAll, includeDiscontinued, productLines, productType, onChange, ...rest} = this.props;

        const all = includeAll ? (<option value="">Product Line: All</option>) : null;
        const none = includeAll ? null : (<option value="" />);
        const lines = productLines
            .filter(pl => includeDiscontinued === true || /^#/.test(pl.ProductLineDesc) === false)
            .filter(pl => !productType || pl.ProductType === productType)
            .sort((a, b) => a.ProductLineDesc === b.ProductLineDesc ? 0 : (a.ProductLineDesc > b.ProductLineDesc ? 1 : -1));

        return (
            <Select value={value} onChange={this.onChange} field={field} {...rest}>
                {none}
                {all}
                {lines.map((pl, index) => {
                    return (
                        <option key={index} value={pl.ProductLine}>{pl.ProductLineDesc} ({pl.ProductLine})</option>
                    )
                })}
            </Select>
        )
    }
}
