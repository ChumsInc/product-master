import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {skuGroup} from '../constants/myPropTypes';
import Select from "../common-components/Select";
import {connect} from 'react-redux';

class SKUGroupSelect extends Component {
    static propTypes = {
        // from redux
        skuGroups: PropTypes.arrayOf(skuGroup),

        // from parent component
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string,
        field: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        includeAll: PropTypes.bool,
        includeInactive: PropTypes.bool,
        productLine: PropTypes.string,
    };

    static defaultProps = {
        skuGroups: [],
        value: '',
        includeAll: false,
        includeInactive: false,
        productLine: null,
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange({field, value}) {
        this.props.onChange({field, value: Number(value)});
    }

    render() {
        const {dispatch, skuGroups, value, field, includeAll, includeInactive, productLine, onChange, ...rest} = this.props;

        const all = includeAll ? (<option value="0">SKU Group: All</option>) : null;
        const none = includeAll ? null : (<option value="" />);
        const groups = skuGroups
            .filter(sg => includeInactive === true || sg.active === true)
            .filter(sg => !productLine || sg.productLine === productLine)
            .sort((a, b) => a.code === b.code ? 0 : (a.code > b.code ? 1 : -1));

        return (
            <Select value={value} onChange={this.onChange} field={field} {...rest}>
                {none}
                {all}
                {groups.map(sg => {
                    return (
                        <option key={sg.id} value={sg.id}>{sg.code} - {sg.description}</option>
                    )
                })}
            </Select>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {skuGroups} = state.settings;
    return {skuGroups};
};

export default connect(mapStateToProps)(SKUGroupSelect);
