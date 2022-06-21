import React, {Component, Fragment} from 'react';
import {NavLink, Route} from 'react-router-dom';
import {buildPath} from "../utils/fetch";
import Seasons from "./Seasons";
import {PATH_SETTINGS_SELECTION} from "../constants/paths";

export default class Settings extends Component {

    render() {
        return (
            <div className="container">
                <h2>Settings</h2>
                <div className="settings">
                    <div className="settings-list">
                        <NavLink to={buildPath(PATH_SETTINGS_SELECTION, {setting: 'seasons'})}>Seasons</NavLink>
                    </div>
                    <div className="settings-editor">
                        <Route path="/settings/seasons" component={Seasons}/>
                    </div>
                </div>
            </div>
        )
    }
}
