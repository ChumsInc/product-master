import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';


export default class TextArea extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        field: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string,
        autoHeight: PropTypes.bool,
        maxHeight: PropTypes.number,
    };

    static defaultProps = {
        className: 'form-control-sm',
        autoHeight: true,
        maxHeight: 250,
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            scrollHeight: 0,
        };
        this.ref = createRef();
        this.onUpdate = this.onUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange = debounce(this.onChange, 500);
    }

    componentWillUnmount() {
        this.onChange.cancel();
    }

    componentDidUpdate(prevProps, prevState) {
        const {value, maxHeight} = this.props;
        const {current} = this.ref;
        if (value !== prevProps.value) {
            this.setState({value});
        }

        if (current && current.scrollHeight > current.clientHeight && current.scrollHeight <= maxHeight) {
            this.setState({scrollHeight: this.ref.current.scrollHeight});
        }
    }

    onUpdate(ev) {
        ev.preventDefault();
        this.setState({value: ev.target.value});
        this.onChange();
    }

    onChange() {
        const {field, onChange} = this.props;
        const {value} = this.state;
        onChange({field, value});
    }

    render() {
        const {autoHeight, maxHeight, className, value: propsValue, field, onChange, ...rest} = this.props;
        const {value} = this.state;
        const style = {
            height: autoHeight && this.ref.current ? this.ref.current.scrollHeight + 2 : undefined,
            maxHeight: maxHeight
        };
        return (
            <textarea value={value} ref={this.ref}
                      className={classNames('form-control', className)}
                      onChange={this.onUpdate} style={style} {...rest}/>
        );
    }
}
