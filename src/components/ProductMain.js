import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import ProgressBar from "../common-components/ProgressBar";
import ProductLineSelect from "./ProductLineSelect";
import InputUPC from "./InputUPC";
import {getProduct, newProduct, saveProduct, updateProduct} from "../actions/product";
import ClickEditor from './ClickEditor';
import DataList from "./DataList";
import Alert from "./Alert";
import ToggleButton, {buttonStyles} from "../common-components/ToggleButton";
import FormGroup from "../common-components/FormGroup";
import FormGroupTextInput from "../common-components/FormGroupTextInput";
import {CheckBoxInline} from "../common-components/CheckBox";
import TextInput from "../common-components/TextInput";
import FormGroupTextArea from "../common-components/FormGroupTextArea";
import SKUGroupSelect from "./SKUGroupSelect";
import {DEFAULT_PRODUCT} from "../constants/defaults";
import SeasonSelector from "./SeasonSelector";

const labelClassName = 'col-4';
const fieldClassName = 'col-8';

const mapStateToProps = (state, ownProps) => {
    const {app, settings, product, productList} = state;
    const {readOnly} = app;
    const {selected, loading} = product;
    const skuExists = !!selected.SKU && productList.list.filter(item => item.SKU === selected.SKU && item.id !== selected.id).length > 0;
    const devCodeExists = !!selected.devCode && productList.list.filter(item => item.devCode === selected.devCode && item.id !== selected.id).length > 0;
    return {readOnly, settings, selected, loading, skuExists, devCodeExists};
};


const mapDispatchToProps = {
    getProduct, newProduct, saveProduct, updateProduct,
};

class ProductMain extends Component {

    static propTypes = {
        readOnly: PropTypes.bool,
        settings: PropTypes.shape({
            productLines: PropTypes.array,
            categories: PropTypes.array,
            subCategories: PropTypes.array,
            skuList: PropTypes.array,
        }),
        selected: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            devCode: PropTypes.string,
            active: PropTypes.bool,
            productType: PropTypes.string,
            productLine: PropTypes.string,
            category: PropTypes.string,
            subCategory: PropTypes.string,
            SKU: PropTypes.string,
            UPC: PropTypes.string,
            suggestedRetailPrice: PropTypes.number,
            stdCost: PropTypes.number,
            stdPrice: PropTypes.number,
            idSKUGroup: PropTypes.number,
            notes: PropTypes.string,
            sellAsSelf: PropTypes.bool,
            sellAsColors: PropTypes.bool,
            sellAsMix: PropTypes.bool,
            color: PropTypes.string,
            changed: PropTypes.bool,
            status: PropTypes.shape({
                'new': PropTypes.bool,
                updating: PropTypes.bool,
                approved: PropTypes.bool,
                live: PropTypes.bool,
                discontinued: PropTypes.bool,
                season: PropTypes.number,
            }),
            attributes: PropTypes.object,
        }),
        loading: PropTypes.bool,
        skuExists: PropTypes.bool,
        devCodeExists: PropTypes.bool,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        getProduct: PropTypes.func.isRequired,
        newProduct: PropTypes.func.isRequired,
        saveProduct: PropTypes.func.isRequired,
        updateProduct: PropTypes.func.isRequired,
    };

    static defaultProps = {
        readOnly: true,
        selected: {
            ...DEFAULT_PRODUCT
        },
        loading: false,
        skuExists: false,
    };

    state = {
        product: {
            ...DEFAULT_PRODUCT
        }
    };


    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRevert = this.onRevert.bind(this);
        this.onNewProduct = this.onNewProduct.bind(this);
        this.onChangeField = this.onChangeField.bind(this);
        this.onChangeSellAs = this.onChangeSellAs.bind(this);
        this.onToggleFlag = this.onToggleFlag.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
    }

    componentDidMount() {
        this.setState({product: this.props.selected});
    }


    componentDidUpdate(prevProps, prevState) {
        const {selected} = this.props;
        const {product} = this.state;
        // console.log('componentDidUpdate()', {id: product.id, selId: selected.id, loading: {prevProps: prevProps.loading, props: this.props.loading}});
        if ((product.id !== selected.id) || (prevProps.loading === true && this.props.loading !== true)) {
            this.setState({product: selected});
        }
    }


    onChangeSellAs({field, value}) {
        const {product} = this.state;
        const {sellAsSelf, sellAsColors, sellAsMix} = product;
        switch (field) {
        case 'sellAsSelf':
            this.setState({product: {...product, sellAsSelf: !sellAsSelf, sellAsMix: false, sellAsColors: false}});
            break;
        case 'sellAsMix':
            this.setState({product: {...product, sellAsMix: !sellAsMix, sellAsSelf: false}});
            break;
        case 'sellAsColors':
            this.setState({product: {...product, sellAsColors: !sellAsColors, sellAsSelf: false}});
            break;
        }
    }

    onSubmit(ev) {
        ev.preventDefault();
        if (this.props.readOnly) {
            return;
        }
        this.props.saveProduct()
            .then(() => {
                if (this.props.match.params.id !== String(this.props.selected.id)) {
                    this.props.history.push(`/product/${this.props.selected.id}`);
                }
            });
    }

    onNewProduct() {
        this.props.newProduct();
        this.props.history.push('/product/new');
    }

    onRevert() {
        const {id} = this.props.selected;
        if (id === 0) {
            return this.onNewProduct();
        }
        this.props.getProduct(id);
    }

    onChangeField({field, value}) {
        this.props.updateProduct({[field]: value});
    }

    onToggleFlag({field, value}) {
        this.props.updateProduct({[field]: value});
    }

    onChangeStatus({field, value}) {
        const {status = {}} = this.props.selected;
        status[field] = value;
        this.props.updateProduct({status});
    }

    render() {
        const {readOnly, loading, skuExists, devCodeExists} = this.props;
        const {categories, subCategories, productLines} = this.props.settings;

        const {
            id, name, devCode, active, productType, productLine, category, subCategory, SKU, UPC,
            suggestedRetailPrice, stdCost, stdPrice, idSKUGroup,
            notes, sellAsSelf, sellAsColors, sellAsMix,
            color, changed, status
        } = this.props.selected;
        const {'new': isNew, updating, approved, live, discontinued} = status;

        return (
            <form onSubmit={this.onSubmit}>
                <FormGroup colWidth={8} label="Dev Code">
                    <TextInput value={devCode || ''} field="devCode" onChange={this.onChangeField}
                                        readOnly={readOnly}/>
                    {devCodeExists && (<Alert message="Dev Code already exists" type="danger"/>)}
                </FormGroup>
                <ProgressBar visible={loading} striped={true} active={true}/>
                <h2>
                    <ClickEditor value={name || ''} onChange={this.onChangeField} field="name"
                                 isNew={id === 0} readOnly={readOnly}
                                 className="form-control form-control-lg" placeholder="Product Name" required/>
                </h2>
                <FormGroup colWidth={8} label="Active">
                    <CheckBoxInline onChange={this.onToggleFlag} label={'Active - shows in SKU System'}
                                    readOnly={readOnly}
                                    field={'active'} checked={active || false}/>
                </FormGroup>
                <FormGroup colWidth={8} label="Season">
                    <SeasonSelector value={status?.season}
                                    onSelect={(value) => this.onChangeStatus({field: 'season', value})}/>
                </FormGroup>
                <FormGroup colWidth={8} label="Status">
                    <ToggleButton field="new" checked={isNew || false} onClick={this.onChangeStatus} disabled={readOnly}
                                  label="New" style={buttonStyles.warning} className="mr-1 mb-1"/>
                    <ToggleButton field="updating" checked={updating || false} onClick={this.onChangeStatus}
                                  disabled={readOnly}
                                  label="Updating" style={buttonStyles.info} className="mr-1 mb-1"/>
                    <ToggleButton field="approved" checked={approved || false} onClick={this.onChangeStatus}
                                  disabled={readOnly}
                                  label="Approved" style={buttonStyles.primary} className="mr-1 mb-1"/>
                    <ToggleButton field="live" checked={live || false} onClick={this.onChangeStatus} disabled={readOnly}
                                  label="Live" style={buttonStyles.success} className="mr-1 mb-1"/>
                    <ToggleButton field="discontinued" checked={discontinued || false} onClick={this.onChangeStatus}
                                  disabled={readOnly}
                                  label="Disco'd" style={buttonStyles.danger} className="mr-1 mb-1"/>
                </FormGroup>
                <FormGroup colWidth={8} label="Product Line">
                    <ProductLineSelect value={productLine || ''} productLines={productLines} field="productLine"
                                       readOnly={readOnly}
                                       onChange={this.onChangeField}
                                       placeholder="Product Line"/>
                </FormGroup>
                <FormGroup colWidth={8} label="SKU Group">
                    <SKUGroupSelect field={'idSKUGroup'} onChange={this.onChangeField} value={idSKUGroup}
                                    readOnly={readOnly}/>
                </FormGroup>
                <FormGroupTextInput colWidth={8} label="Category" readOnly={readOnly}
                                    maxLength={10}
                                    onChange={this.onChangeField} value={category || ''} field="category"
                                    placeholder="Category" list="categories">
                    <DataList id="categories"
                              list={categories.map(cat => ({value: cat.Category2, text: cat.description}))}/>
                </FormGroupTextInput>
                <FormGroupTextInput colWidth={8} label="Collection" readOnly={readOnly}
                                    onChange={this.onChangeField} value={subCategory || ''} field="subCategory"
                                    maxLength={10}
                                    placeholder="Collection" list="sub-categories">
                    <DataList id="sub-categories"
                              list={subCategories.map(cat => ({value: cat}))}/>
                </FormGroupTextInput>
                <FormGroup colWidth={8} label="SKU">
                    <TextInput id="SKU" value={SKU || ''} onChange={this.onChangeField}
                               maxLength={10}
                               field="SKU" readOnly={readOnly}/>
                    {skuExists && (<Alert message="SKU Already exists." type="warning" title="Warning:"/>)}
                </FormGroup>
                <FormGroup colWidth={8} label={sellAsSelf ? 'Item UPC' : 'Base UPC'}>
                    <InputUPC value={UPC || ''} field={'UPC'} readOnly={readOnly}
                              onChange={this.onChangeField}
                              placeholder="0 00000 00000 0"/>
                </FormGroup>
                <FormGroup colWidth={8} label="Sell As">
                    <CheckBoxInline onChange={this.onToggleFlag} label={'Single Item'} readOnly={readOnly}
                                    field={'sellAsSelf'} checked={sellAsSelf || false}/>
                    <CheckBoxInline onChange={this.onToggleFlag} label={'Mix'} readOnly={readOnly}
                                    field={'sellAsMix'} checked={sellAsMix || false}/>
                    <CheckBoxInline onChange={this.onToggleFlag} label={'Colors'} readOnly={readOnly}
                                    field={'sellAsColors'} checked={sellAsColors || false}/>
                </FormGroup>
                {sellAsSelf && <FormGroupTextInput colWidth={8} label="Product Color" readOnly={readOnly}
                                                   onChange={this.onChangeField} value={color} field="color"/>
                }
                <FormGroup colWidth={8} label="Wholesale / MSRP">
                    <div className="row g-3">
                        <div className="col-6">
                            <TextInput type="number" step=".01" min="0" readOnly={readOnly}
                                       onChange={this.onChangeField} value={stdPrice || ''} field="stdPrice"
                                       placeholder="Wholesale"/>
                        </div>
                        <div className="col-6">
                            <TextInput type="number" step=".01" min="0" readOnly={readOnly}
                                       onChange={this.onChangeField} value={suggestedRetailPrice || ''}
                                       field="suggestedRetailPrice"
                                       placeholder="MSRP"/>
                        </div>
                    </div>
                </FormGroup>
                <FormGroupTextArea colWidth={8} label="Notes" readOnly={readOnly}
                                   value={notes || ''} field={'notes'} onChange={this.onChangeField}/>
                <FormGroup colWidth={8} label=" ">
                    <div className="row g-3">
                        <div className="col-auto">
                            <button type="submit" className="btn btn-sm btn-primary mr-3" disabled={readOnly}>Save</button>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-sm btn-outline-secondary mr-3"
                                    disabled={readOnly} onClick={this.onRevert}>
                                Revert
                            </button>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-sm btn-outline-secondary mr-3"
                                    disabled={readOnly} onClick={this.onNewProduct}>
                                New
                            </button>
                        </div>
                    </div>
                </FormGroup>

                {changed ?
                    <Alert message="Don't forget to save your changes!" title="Changes..." type="danger"/> : null}
            </form>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductMain));

/**
 @todo  Load UPC & details from SKU System
 @todo  Change SKU system SKU GROUP to be for a single product line, maybe find a way to tie sku group to Product Line?
 @todo SKU System, set up to maintain categories and subCategories.
 @todo Allow to enter new item from just SKU, load all pertinent data from SKU System entries.
 */
