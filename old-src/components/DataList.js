import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class DataList extends Component {
    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            text: PropTypes.string,
        })).isRequired,
        id: PropTypes.string.isRequired,
    };
    render() {
        const {list, id} = this.props;
        return (
            <datalist id={id}>
                {list.map((item, key) => (<option key={key} value={item.value}>{item.text}</option>))}
            </datalist>
        )
    }
}
