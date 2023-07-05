import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SeasonButton from "./SeasonButton";
import {PRODUCT_STATUS} from '../constants/productStatus';
import CustomColorButton, {customColorDefaultColor} from "./CustomColorButton";

class StatusSelector extends Component {
    static propTypes = {
        value: PropTypes.oneOf(['', 'new', 'updating', 'approved', 'live', 'discontinued']),
        onSelect: PropTypes.func.isRequired,
    };

    static defaultProps = {
        value: '',
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

    onSelect(status) {
        this.setState({show: false});
        this.props.onSelect(status.code)
    }

    render() {
        const {list, value} = this.props;
        const {show} = this.state;
        const [selected = {}] = PRODUCT_STATUS.filter(status => status.code === value);
        return (
            <div className="dropdown">
                <CustomColorButton hexColor={selected.className ? null : customColorDefaultColor} className={classNames("btn btn-sm dropdown-toggle",  'btn-' + selected.className)}
                                   onClick={this.onToggleDropDown}>
                    {selected.title || 'Select Status'}
                </CustomColorButton>
                <div className={classNames("dropdown-menu p-1 mt-1 mb-1", {show})}>
                    <SeasonButton className="mr-1" onClick={() => this.onSelect({})} code="All Products" selected={!value} />
                    {PRODUCT_STATUS.map(status => (
                        <CustomColorButton key={status.code}
                                           hexColor={null}
                                      className={classNames("mr-1 mb-1 btn btn-sm ", 'btn-' + status.className)}
                                onClick={() => this.onSelect(status)}>
                            {status.title}
                        </CustomColorButton>
                    ))}
                </div>
            </div>
        );
    }
}

export default StatusSelector;
