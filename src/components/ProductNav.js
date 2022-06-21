import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom";

function mapStateToProps(state) {
    return {};
}

const mapDispatchToProps = {};

class ProductNav extends Component {
    static propTypes = {};
    static defaultProps = {};

    render() {
        return (
            <nav className="nav flex-column nav-pills">
                <NavLink to={dimensionsLink} className="nav-link">Dimensions</NavLink>
                <NavLink to={itemsLink} className="nav-link">Sage Items</NavLink>
            </nav>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductNav);
