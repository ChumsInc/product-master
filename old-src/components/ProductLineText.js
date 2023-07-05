import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {propTypeProductLine} from "../constants/myPropTypes";

class ProductLineText extends PureComponent {
    static propTypes = {
        productLine: PropTypes.string,
        productLines: PropTypes.arrayOf(PropTypes.shape(propTypeProductLine))
    };

    static defaultProps = {
        productLines: [],
    };

    render() {
        const {productLine, productLines} = this.props;
        if (!productLine) {
            return '-';
        }
        const [pl = {}] = productLines.filter(pl => pl.ProductLine === productLine);
        return (
            <Fragment>{pl.ProductLineDesc || '-'} ({pl.ProductLine || productLine})</Fragment>
        );
    }
}

const mapStateToProps = ({settings}) => {
    const {productLines} = settings;
    return {productLines};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductLineText) 
