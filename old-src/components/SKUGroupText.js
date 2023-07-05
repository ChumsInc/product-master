import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {skuGroup} from "../constants/myPropTypes";

function mapStateToProps(state) {
    const {skuGroups} = state.settings;
    return {skuGroups};
}

const mapDispatchToProps = {};

class SkuGroupText extends Component {
    static propTypes = {
        skuGroups: PropTypes.arrayOf(skuGroup),
        id: PropTypes.number,
    };
    static defaultProps = {};

    render() {
        const {skuGroups, id} = this.props;
        const [skuGroup = {}] = skuGroups.filter(sg => sg.id === id)
        return (
            <span title={skuGroup.description || ''}>
                {skuGroup.code || ''}
            </span>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SkuGroupText);
