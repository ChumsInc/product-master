import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchVersion} from '../actions/app';


function mapStateToProps({app}) {
    const {version} = app;
    return {
        version
    };
}

const mapDispatchToProps = {
    fetchVersion
};

const updateStyle = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    border: '0.25rem solid #ce0e2d',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '0.5rem 1.5rem',
};

const UPDATE_CHECK_INTERVAL = 30 * 60 * 1000;

class AppVersion extends Component {
    static propTypes = {
        version: PropTypes.string,
        fetchVersion: PropTypes.func.isRequired,
    };
    static defaultProps = {
        version: '',
        fetchVersion,
    };

    state = {
        updateAvailable: false,
        dismissed: false,
    }

    timer = null;

    constructor(props) {
        super(props);
        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.onDismissUpdates = this.onDismissUpdates.bind(this);
    }

    componentDidMount() {
        this.props.fetchVersion();
        this.timer = setInterval(this.props.fetchVersion, UPDATE_CHECK_INTERVAL);
        document.addEventListener('visibilitychange', this.props.fetchVersion, false);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.version !== prevProps.version && !!prevProps.version && !this.state.updateAvailable) {
            this.setState({updateAvailable: true});
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        document.removeEventListener('visibilitychange', this.props.fetchVersion);
    }

    onClickUpdate(ev) {
        ev.preventDefault();
        document.location.reload(true);
    }

    onDismissUpdates() {
        this.props.setState({dismissed: true});
    }

    render() {
        const {version} = this.props;
        const {updateAvailable, dismissed} = this.state;
        return (
            <div>
                <span onClick={this.props.fetchVersion}>Version: {version}</span>
                {!!updateAvailable && !dismissed && (
                    <div style={updateStyle} onClick={this.onClickUpdate}>
                        Update Available! Click here to refresh
                        <span className="ml-3 close" onClick={this.onDismissUpdates}>&times;</span>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppVersion);

/*
export const FETCH_VERSION = 'FETCH_VERSION';

// action
export const fetchVersion = () => (dispatch, getState) => {
    dispatch({type: FETCH_VERSION, status: FETCH_INIT});
    fetch('package.json', {cache: "no-cache", credentials: 'same-origin'})
        .then(res => res.json())
        .then(res => {
            const {version} = res;
            dispatch({type: FETCH_VERSION, status: FETCH_SUCCESS, version});
        })
        .catch(err => {
            dispatch({type: FETCH_VERSION, status: FETCH_FAILURE});
            console.log(err.message);
        });
}

// reducer
const version = (state = '', action) => {
    const {type, status, version} = action;
    switch (type) {
    case FETCH_VERSION:
        if (status === FETCH_SUCCESS) {
            return version;
        }
        return state;
    default:
        return state;
    }
}
*/
