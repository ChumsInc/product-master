import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from "prop-types";
import ProgressBar from "../common-components/ProgressBar";
import ProductTypeSelect from "./ProductTypeSelect";
import ProductLineSelect from "./ProductLineSelect";
import SortableTable from "../common-components/SortableTable";
import {formatUPC} from '../utils/upc';
import {fetchSettings} from '../actions/settings';
import {getProductList, selectProduct} from "../actions/product";
import {Link} from 'react-router-dom';
import FormGroupTextInput from "../common-components/FormGroupTextInput";
import FormGroup from "../common-components/FormGroup";
import {CheckBoxInline} from "../common-components/CheckBox";
import SKUGroupSelect from "./SKUGroupSelect";
import {setProductListUI} from "../actions/app";
import {DEFAULT_PRODUCT} from "../constants/defaults";
import SeasonSelector from "./SeasonSelector";
import StatusSelector from "./StatusSelector";




const mapStateToProps = (state, ownProps) => {
    const {app, settings, productList, ui} = state;
    const {productListUI} = ui;
    return {app, settings, productList, ui: productListUI};
};

const mapDispatchToProps = {
    getProductList,
    selectProduct,
    fetchSettings,
    setProductListUI
}
class ProductListTable extends Component {
    static propTypes = {
        ui: PropTypes.shape({
            filter: PropTypes.string,
            productLine: PropTypes.string,
            active: PropTypes.bool,
            skuGroup: 0,
            categories: PropTypes.bool,
            prices: PropTypes.bool,
            upc: PropTypes.bool,
            dimensions: PropTypes.bool,
            notes: PropTypes.bool,
        }),
        getProductList: PropTypes.func.isRequired,
        selectProduct: PropTypes.func.isRequired,
        fetchSettings: PropTypes.func.isRequired,
        setProductListUI: PropTypes.func.isRequired,
    };

    state = {
        filter: '',
        productLine: '',
        active: true,
        skuGroup: 0,
        categories: false,
        prices: false,
        upc: true,
        dimensions: true,
        notes: false,
    };

    constructor(props) {
        super(props);
        this.onClickReload = this.onClickReload.bind(this);
        this.onClickNewProduct = this.onClickNewProduct.bind(this);
        this.onClickProduct = this.onClickProduct.bind(this);
        this.renderProductLine = this.renderProductLine.bind(this);
        this.renderSKUGroup = this.renderSKUGroup.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeProductLine = this.onChangeProductLine.bind(this);
        this.onToggleSection = this.onToggleSection.bind(this);
    }


    onClickReload() {
        this.props.fetchSettings();
        this.props.getProductList();
    }

    onClickNewProduct() {
        this.props.selectProduct(DEFAULT_PRODUCT);
    }

    onClickProduct(product) {
        this.props.selectProduct(product);
    }

    renderProductLine(row) {
        const [productLine] = this.props.settings.lines.filter(pl => pl.ProductLine === row.productLine);
        return productLine ? `${productLine.ProductLineDesc} (${productLine.ProductLine})` : row.productLine;
    }

    renderSKUGroup(row) {
        const {code = '', description = ''} = this.props.settings.skuGroups[row.idSKUGroup] || {};
        return `${code} - ${description}`;
    }

    onToggleSection({field, value}) {
        this.props.setProductListUI({[field]: !this.props.ui[field]});
    }

    onChangeValue({field, value}) {
        this.props.setProductListUI({[field]: value, page: 1});
    }

    onChangeProductLine({field, value}) {
        this.props.setProductListUI({[field]: value, page: 1, skuGroup: 0});
    }

    render() {
        const {productLine, filter, active, skuGroup, dimensions, categories, notes, upc, prices, status, season, statusFilter} = this.props.ui;
        const {settings} = this.props;
        return (
            <div>
                <div className="row g-3">
                    <div className="col-auto">
                        <ProductLineSelect value={productLine} field="productLine" includeAll={true}
                                           onChange={this.onChangeProductLine}
                                           includeDiscontinued={!active}
                                           productLines={settings.productLines}/>
                    </div>
                    <div className="col-auto">
                        <SKUGroupSelect value={skuGroup} field="skuGroup"
                                        onChange={this.onChangeValue}
                                        productLine={productLine}
                                        includeAll={true} includeInactive={!active}/>
                    </div>
                    <div className="col-auto">
                        <SeasonSelector onSelect={(season) => this.props.setProductListUI({season})} value={season || ''} />
                    </div>
                    <div className="col-auto">
                        <StatusSelector onSelect={(statusFilter) => this.props.setProductListUI({statusFilter})} value={statusFilter || ''} />
                    </div>
                    <div className="col">
                        <FormGroupTextInput onChange={this.onChangeValue} value={filter} field="filter" label="Filter" type="search"/>
                    </div>
                    <div className="col-auto">
                        <button type="button" onClick={this.onClickReload} className="btn btn-primary btn-sm">Reload</button>
                    </div>
                    <div className="col-auto">
                        <Link to="/product/0" onClick={this.onClickNewProduct} className="btn btn-outline-warning btn-sm">New Product</Link>
                    </div>
                </div>
                <div className="form-inline">
                    <FormGroup label="Display" labelClassName="mr-3">
                        <CheckBoxInline checked={active} field="active" onChange={this.onToggleSection} label="Only Active" />
                        <CheckBoxInline checked={status} field="status" onChange={this.onToggleSection} label={'Status'}/>
                        <CheckBoxInline checked={categories} field="categories" onChange={this.onToggleSection} label={'Categories'}/>
                        <CheckBoxInline checked={upc} field="upc" onChange={this.onToggleSection} label={'UPC'}/>
                        <CheckBoxInline checked={prices} field="prices" onChange={this.onToggleSection} label={'Prices'}/>
                        <CheckBoxInline checked={dimensions} field="dimensions" onChange={this.onToggleSection} label={'Dimensions'}/>
                        <CheckBoxInline checked={notes} field="notes" onChange={this.onToggleSection} label={'Notes'}/>
                    </FormGroup>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListTable);
