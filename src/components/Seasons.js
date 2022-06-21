import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BasicEditor from "./BasicEditor";
import {fetchSeasons, newSeason, saveSeason, selectSeason, updateSeason} from '../actions/seasons';
import classNames from 'classnames';
import {noop} from "../utils/general";
import FormGroup from "../common-components/FormGroup";
import CustomColorPicker from "./CustomColorPicker";
import {SwatchesPicker} from "react-color";
import CustomColorButton from "./CustomColorButton";

const defaultColor = '#d9d9d9';

class Seasons extends Component {
    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            code: PropTypes.string,
            notes: PropTypes.string,
            props: PropTypes.object,
        })),
        loading: PropTypes.bool,
        selected: PropTypes.shape({}),
        fetchSeasons: PropTypes.func.isRequired,
        newSeason: PropTypes.func.isRequired,
        saveSeason: PropTypes.func.isRequired,
        selectSeason: PropTypes.func.isRequired,
        updateSeason: PropTypes.func.isRequired,
    };

    static defaultProps = {
        list: [],
        loading: false,
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchSeasons();
    }


    onChange({field, value}) {
        this.props.updateSeason({[field]: value});
    }

    onChangeColor(color) {
        const {properties} = this.props.selected;
        const updatedProperties = {...properties, color: color.hex};
        this.props.updateSeason({properties: updatedProperties});
    }

    onSubmit() {
        const {selected} = this.props;
        if (!selected.changed) {
            return;
        }
        this.props.saveSeason(selected);
    }

    render() {
        const {list, loading, selected} = this.props;

        return (
            <div>
                <h3>Seasons Editor</h3>
                <div className="settings">
                    <div className="settings-list">
                        <ul className="list-group">
                            <CustomColorButton className={classNames("list-group-item list-group-item-action", {active: selected.id === 0})}
                                               onClick={this.props.newSeason} hexColor={defaultColor}>
                                {'New Season'}
                            </CustomColorButton>
                            {list.map(s => (
                                <CustomColorButton className={classNames("list-group-item list-group-item-action", {active: selected.id === s.id})}
                                    onClick={() => this.props.selectSeason(s)} hexColor={s.properties.color}>
                                    {s.code}
                                </CustomColorButton>
                            ))}
                        </ul>
                    </div>
                    <div className="settings-editor">
                        <BasicEditor onChange={this.onChange} onSubmit={this.onSubmit} {...selected}>
                            <FormGroup colWidth={8} label="Color">
                                <SwatchesPicker color={selected.properties.color || defaultColor} className="border rounded mb-3"
                                                style={{}}
                                                zDepth={0}
                                                width="100%" height="140px"
                                                onChangeComplete={this.onChangeColor} />
                            </FormGroup>
                        </BasicEditor>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({settings}) => {
    const {loading, list, selected} = settings.seasons;
    return {loading, list, selected};
};

const mapDispatchToProps = {fetchSeasons, newSeason, saveSeason, selectSeason, updateSeason};

export default connect(mapStateToProps, mapDispatchToProps)(Seasons) 
