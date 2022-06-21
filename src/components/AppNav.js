import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AlertList from './AlertList';
import {Link, NavLink} from 'react-router-dom';
import {} from "../constants/actions";
import {dismissAlert, fetchRoles, setCompany} from "../actions/app";
import {fetchSettings} from "../actions/settings";
import onClickOutside from 'react-onclickoutside';
import {getProductList} from "../actions/product";
import {COMPANIES} from "../constants/defaults";
import {PATH_PRODUCT, PATH_PRODUCT_LIST, PATH_SETTINGS} from "../constants/paths";
import {buildPath} from "../utils/fetch";
import CompanySelect from "./CompanySelect";
import AppVersion from "./AppVersion";



class AppNav extends Component {
    static propTypes = {
        alerts: PropTypes.array,

    };

    constructor(props) {
        super(props);
        this.onDismissAlert = this.onDismissAlert.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
    }


    componentDidMount() {
        this.props.dispatch(fetchSettings());
        if (this.props.userRoles.length === 0) {
            this.props.dispatch(fetchRoles());
        }
        this.props.dispatch(getProductList());
    }

    onChangeCompany(val) {
        this.props.dispatch(setCompany(val));
    }

    onDismissAlert({id}) {
        this.props.dispatch(dismissAlert(id));
    }


    render() {
        const {alerts, company, product} = this.props;
        return (
            <Fragment>
                <ul className="nav nav-tabs mb-1">
                    <CompanySelect company={company} onSelect={this.onChangeCompany} />
                    <li className="nav-item">
                        <NavLink className="nav-link" to={PATH_PRODUCT_LIST}>Product List</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={buildPath(PATH_PRODUCT, {id: product.id})}>{product.name || 'New Product'}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={buildPath(PATH_SETTINGS, {setting: ''})}>Settings</NavLink>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href='#' onClick={(ev) => ev.preventDefault()}><AppVersion /></a>
                    </li>
                </ul>
                <AlertList />
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { alerts, company, userRoles} = state.app;
    const {selected: product} = state.product;
    return { alerts, company, userRoles, product };
};

export default connect(mapStateToProps)(AppNav);
