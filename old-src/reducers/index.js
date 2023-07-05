import { combineReducers } from 'redux';

import app from './app';
import settings from './settings';
import product from './product';
import productList from './productList';
import ui from './ui';

export default combineReducers({
    app,
    settings,
    product,
    productList,
    ui,
});
