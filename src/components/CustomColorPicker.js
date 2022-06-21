import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CustomPicker} from 'react-color';
import {Hue, Saturation} from 'react-color/lib/components/common';
import classNames from 'classnames';
import {isLightColor} from "../utils/general";

class CustomColorPicker extends Component {
    state = {
        showPicker: false,
    }


    render() {
        const {showPicker} = this.state;
        const isLight = isLightColor(this.props.hex);
        return (
            <div>
                {!showPicker && (
                    <button type="button" className={classNames("btn", {'btn-light': isLight, 'btn-dark': !isLight})}
                            style={{backgroundColor: this.props.hex}} onClick={() => this.setState({showPicker: true})}>
                        Current
                    </button>
                )}
                {!!showPicker && (
                    <div className="border rounded rounded-sm p-2">
                        <div className="mb-1" style={{height: '10px', position: 'relative'}}>
                            <Hue {...this.props}/>
                        </div>
                        <div style={{height: '25px', position: 'relative'}}>
                            <Saturation {...this.props}/>
                        </div>
                    </div>
                )}

            </div>
        );
    }
}

export default CustomPicker(CustomColorPicker);
