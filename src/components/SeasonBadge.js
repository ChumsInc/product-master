import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {propTypeSeason} from "../constants/myPropTypes";import Badge from "../common-components/Badge";
import {isLightColor} from "../utils/general";

function mapStateToProps({settings}) {
    const {list} = settings.seasons
    return {list};
}

const mapDispatchToProps = {};

class SeasonBadge extends Component {
    static propTypes = {
        id: PropTypes.number,
        list: PropTypes.arrayOf(PropTypes.shape(propTypeSeason)),
    };
    static defaultProps = {
        season: 0,
    };

    render() {
        const {list, id} = this.props;
        const [season] = list.filter(season => season.id === id);
        if (!season) {
            return null;
        }
        const {code, description, properties} = season;
        const isLight = isLightColor(properties.color);
        const className = {
            'text-light': !isLight,
            'text-dark': isLight,
        }
        return (
            <Badge className={className} title={description} backgroundColor={properties.color}>{code}</Badge>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SeasonBadge);
