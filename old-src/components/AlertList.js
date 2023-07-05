import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from "./Alert";
import {connect} from 'react-redux';
import {dismissAlert} from "../actions/app";

class AlertList extends Component {
    static propTypes = {
        alerts: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            type: PropTypes.string,
            title: PropTypes.string,
            message: PropTypes.string.isRequired,
        })).isRequired
    };

    static propDefaults = {
        alerts: []
    };

    constructor(props) {
        super(props);
        this.onClickDismiss = this.onClickDismiss.bind(this);
    }

    onClickDismiss(id) {
        this.props.dispatch(dismissAlert(id));
    }

    render() {
        const {alerts} = this.props;
        return (
            <div>
                {alerts.map((alert, key) => <Alert key={key} {...alert} onDismiss={this.onClickDismiss}/>)}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {alerts} = state.app;
    return {alerts};
};

export default connect(mapStateToProps)(AlertList);
