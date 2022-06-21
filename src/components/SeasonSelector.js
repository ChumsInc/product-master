import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {propTypeSeason} from "../constants/myPropTypes";
import CustomColorButton from "./CustomColorButton";
import classNames from 'classnames';
import SeasonButton from "./SeasonButton";

class SeasonSelector extends Component {
    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.shape(propTypeSeason)),
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onSelect: PropTypes.func.isRequired,
    };

    static defaultProps = {
        list: [],
        value: 0,
    };

    state = {
        open: false,
    }

    constructor(props) {
        super(props);
        this.onToggleDropDown = this.onToggleDropDown.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    onToggleDropDown() {
        this.setState({
            show: !this.state.show,
        })
    }

    onSelect(season) {
        this.setState({show: false});
        this.props.onSelect(season.id)
    }

    render() {
        const {list, value} = this.props;
        const {show} = this.state;
        const [selected = {}] = list.filter(season => season.id === value);
        const color = selected.properties?.color;
        return (
            <div className="dropdown">
                <CustomColorButton hexColor={color} className="btn btn-sm dropdown-toggle"
                                   onClick={this.onToggleDropDown}>
                    {selected.code || 'Select Season'}
                </CustomColorButton>
                <div className={classNames("dropdown-menu p-1 mt-1", {show})}>
                    <SeasonButton className="mr-1" onClick={() => this.onSelect({})} code="Not Assigned" selected={!value} />
                    {list.map(season => (
                        <SeasonButton key={season.id} {...season}
                                      className="mr-1"
                                      onClick={() => this.onSelect(season)}
                                      selected={season.id === value} />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({settings}) => {
    const {loading, list} = settings.seasons;
    return {loading, list};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelector) 
