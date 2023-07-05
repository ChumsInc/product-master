import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import AppNavigation from './components/AppNav';
import ProductList from "./components/ProductList";
import ProductContainer from "./components/ProductContainer";
import Settings from "./components/Settings";
import {PATH_PRODUCT, PATH_PRODUCT_LIST, PATH_SETTINGS} from "./constants/paths";
import packageJSON from '../package.json';
import AlertList from "./components/AlertList";




const Root = ({store}) => {
    return (
        <Provider store={store}>
            <Router>
                <AlertList />
                <div className="product-master-container">
                    <Route exact path="/" render={() => <Redirect to={PATH_PRODUCT_LIST}/>}/>
                    <Route path="/" component={AppNavigation} />
                    <div className="container-fluid">
                        <Route path={PATH_PRODUCT_LIST} component={ProductList} />
                        <Route path={PATH_PRODUCT} component={ProductContainer}/>
                        <Route path={PATH_SETTINGS} component={Settings} />
                    </div>
                </div>
            </Router>

        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
