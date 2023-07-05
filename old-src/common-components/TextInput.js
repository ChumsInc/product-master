import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';


export default class TextInput extends PureComponent {
    static propTypes = {
        type: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        field: PropTypes.string,
        className: PropTypes.string,
        id: PropTypes.string,
        blurFunction: PropTypes.func,
    };

    static defaultProps = {
        type: 'text',
        value: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.onUpdate = this.onUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);

        this.onChange = debounce(this.onChange, 350);
    }

    componentDidMount() {
        if (this.props.value !== this.state.value) {
            this.setState({value: this.props.value});
        }
    }

    componentWillUnmount() {
        this.onChange.cancel();
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate()', {value: this.props.value, prev: prevProps.value, state: this.state.value});
        if (this.props.value !== prevProps.value) {
            this.setState({value: this.props.value});
        }
    }


    onUpdate(ev) {
        this.setState({value: ev.target.value});
        this.onChange();
    }

    onChange() {
        const {value} = this.state;
        const {field} = this.props;
        if (this.props.type === 'number') {
            this.props.onChange({field, value: Number(value)});
        } else {
            this.props.onChange({field, value});
        }
    }

    onBlur() {
        const {type, step, field, onChange, blurFunction} = this.props;
        const {value} =  this.state;
        if (typeof blurFunction === 'function') {
            this.setState({value: blurFunction(value)}, this.onChange);
            return;
        }
        if (type === 'number' && step) {
            const [,decimals] = /\.([0-9]+)/.exec(step);
            this.setState({value: Number(value).toFixed(decimals.length)});
            onChange({field, value: Number(value)});
        } else if (type === 'number') {
            onChange({field, value: Number(value)});
        }
    }

    render() {
        const {onChange, onBlur, blurFunction, value: propsValue, field, type, className = '', id, ...rest} = this.props;
        //unused constants above are removed so that ...rest can be passed to input.
        const {value} = this.state;
        const _className = {
            'form-control': true,
            'form-control-sm': !className.split(' ').includes('form-control-lg'),
            className
        };
        return (
            <input type={type} value={value} className={classNames(_className)} id={id} {...rest}
                   onBlur={this.onBlur}
                   onChange={this.onUpdate}/>
        );
    }
}
