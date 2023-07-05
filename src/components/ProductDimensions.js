import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {adjustablePropType, dimensionPropType} from "../constants/myPropTypes";
import {connect} from "react-redux";
import DimensionInput from "./DimensionInput";
import AdjustableInput from "./AdjustableInput";
import FormGroupTextArea from "../common-components/FormGroupTextArea";
import Alert from "./Alert";
import {saveAttributes} from "../actions/product";
import {DEFAULT_ADJUSTABLE, DEFAULT_DIMENSION} from "../constants/defaults";
import TextArea from "./TextArea";

class ProductDimensions extends Component {
    static propTypes = {
        dimensions: dimensionPropType,
        shippingDimensions: dimensionPropType,
        casePackDimensions: dimensionPropType,
        adjustable: adjustablePropType,
        dimensionNotes: PropTypes.string,
        readOnly: PropTypes.bool,
    };

    static defaultProps = {
        dimensions: DEFAULT_DIMENSION,
        shippingDimensions: DEFAULT_DIMENSION,
        casePackDimensions: DEFAULT_DIMENSION,
        adjustable: DEFAULT_ADJUSTABLE,
        dimensionNotes: '',
        readOnly: true,
    };

    state = {
        productId: 0,
        dimensions: DEFAULT_DIMENSION,
        shippingDimensions: DEFAULT_DIMENSION,
        casePackDimensions: DEFAULT_DIMENSION,
        adjustable: DEFAULT_ADJUSTABLE,
        dimensionNotes: '',
        changed: false
    };

    constructor(props) {
        super(props);
        this.onChangeField = this.onChangeField.bind(this);
        this.onChangeDimensions = this.onChangeDimensions.bind(this);
        this.onChangeShippingDimensions = this.onChangeShippingDimensions.bind(this);
        this.onChangeCasePackDimensions = this.onChangeCasePackDimensions.bind(this);
        this.onChangeAdjustable = this.onChangeAdjustable.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        const {productId, dimensions, shippingDimensions, casePackDimensions, adjustable, dimensionNotes} = this.props;
        this.setState({productId, dimensions, shippingDimensions, casePackDimensions, adjustable, dimensionNotes, changed: false});
    }


    componentDidUpdate(prevProps, prevState) {
        const {productId: id} = this.props;
        const {productId} = this.state;
        // console.log('componentDidUpdate()', {id: product.id, selId: selected.id, loading: {prevProps: prevProps.loading, props: this.props.loading}});
        if ((productId !== id) || (prevProps.loading === true && this.props.loading !== true)) {
            this.componentDidMount();
        }
    }

    onChangeField({field, value}) {
        console.log('onChangeField()', {field, value});
        switch (field) {
        case 'dimensionNotes':
            this.setState({dimensionNotes: value, changed: true});
        }
    }

    onChangeDimensions(dimensions) {
        this.setState({dimensions, changed: true});
    }

    onChangeShippingDimensions(shippingDimensions) {
        this.setState({shippingDimensions, changed: true});
    }

    onChangeCasePackDimensions(casePackDimensions) {
        this.setState({casePackDimensions, changed: true});
    }

    onChangeAdjustable(adjustable) {
        this.setState({adjustable, changed: true});
    }

    onSave(ev) {
        ev.preventDefault();
        if (this.props.readOnly) {
            return;
        }
        this.props.dispatch(saveAttributes(this.state));
    }

    render() {
        const {readOnly} = this.props;
        const {dimensions, shippingDimensions, casePackDimensions, adjustable, dimensionNotes, changed} = this.state;
        return (
            <form onSubmit={this.onSave} className="dimensions dimensions-inline">
                <section className="mb-3">
                    <h2 className="">Product Dimensions (inches, lbs)</h2>
                    <DimensionInput onChange={this.onChangeDimensions} inline={true} dimensions={dimensions} hasWeight={true} readOnly={readOnly}/>
                </section>
                <hr />
                <section className="mb-3">
                    <h2>Packaged Dimensions (product with packaging; inches, lbs)</h2>
                    <DimensionInput onChange={this.onChangeShippingDimensions} inline={true} dimensions={shippingDimensions} hasWeight={true} readOnly={readOnly}/>
                </section>
                <hr />
                <section className="mb-3">
                    <h2>Inner Pack Dimensions (inches)</h2>
                    <DimensionInput onChange={this.onChangeCasePackDimensions} inline={true} dimensions={casePackDimensions} hasQuantity={true} readOnly={readOnly}/>
                </section>
                <hr />
                <section className="my-3">
                    <h2>Dimension Notes</h2>
                    <TextArea value={dimensionNotes || ''} field="dimensionNotes" onChange={this.onChangeField} />
                </section>
                {!!changed && <Alert message="Don't forget to save your changes" type="warning"/>}
                <button type="submit" className="btn btn-primary" disabled={readOnly}>Save Dimensions</button>
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {app, settings, product} = state;
    const {readOnly} = app;
    const {loading, selected} = product;
    const {dimensions, adjustable, shippingDimensions, casePackDimensions, dimensionNotes} = selected.attributes || {};
    return {
        readOnly,
        settings,
        loading,
        productId: selected.id,
        dimensions,
        adjustable,
        shippingDimensions,
        casePackDimensions,
        dimensionNotes
    };
};
export default connect(mapStateToProps)(ProductDimensions);
