import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import ProgressBar from "../common-components/ProgressBar";
import SortableTable from "../common-components/SortableTable";
import {formatUPC} from '../utils/upc';
import {selectProduct} from "../actions/product";
import {Link} from 'react-router-dom';
import Dimension from "./Dimension";
import {setProductListUI} from "../actions/app";
import Volume from "./Volume";
import Weight from "./Weight";
import ProductLineText from "./ProductLineText";
import SkuGroupText from "./SKUGroupText";
import numeral from 'numeral';
import {calcVolume} from "../utils/general";
import SeasonBadge from "./SeasonBadge";
import StatusBadges from "./StatusBadges";
import TrimmedString from "../common-components/TrimmedString";

const CATEGORY_FIELDS = [
    {
        field: 'productLine',
        title: 'Product Line',
        render: (row) => <ProductLineText productLine={row.productLine}/>,
        className: 'border-left'
    },
    {field: 'category', title: 'Category', render: (row) => row.category || '-'},
    {field: 'idSKUGroup', title: 'SKU Group', render: (row) => <SkuGroupText id={row.idSKUGroup}/>},
];
const UPC_FIELDS = [
    {field: 'UPC', render: (row) => formatUPC(row.UPC), className: 'no-break center border-left'}
];

const PRICE_FIELDS = [
    {
        field: 'stdPrice',
        title: 'Wholesale',
        render: ({stdPrice}) => !!stdPrice ? numeral(stdPrice).format('$0,0.00') : '',
        className: 'right border-left'
    },
    {
        field: 'suggestedRetailPrice',
        title: 'MSRP',
        render: ({suggestedRetailPrice: msrp}) => !!msrp ? numeral(msrp).format('$0,0.00') : '',
        className: 'right'
    },
];

const DIMENSION_FIELDS = [
    {
        field: 'dimensions',
        title: 'Dimensions (in)',
        noSort: true,
        render: (row) => <Dimension {...row.attributes.dimensions}/>,
        className: 'dimensions border-left'
    },
    {
        field: 'weight',
        title: 'Weight (lb)',
        render: (row) => <Weight {...row.attributes.dimensions} />,
        className: {weight: true, right: true}
    },
    {
        field: 'shippingDimensions',
        title: 'Packaged Dimensions (in)',
        noSort: true,
        render: (row) => <Dimension {...row.attributes.shippingDimensions}/>,
        className: 'dimensions border-left'
    },
    {
        field: 'shippingWeight',
        title: 'Packaged Weight (lb)',
        render: (row) => <Weight {...row.attributes.shippingDimensions} />,
        className: {weight: true, right: true}
    },
    {
        field: 'casePackDimensions',
        title: 'Inner Pack Dimensions (in)',
        noSort: true,
        render: (row) => <Dimension {...row.attributes.casePackDimensions}/>,
        className: 'dimensions border-left'
    },
    {
        field: 'casePackQty',
        title: 'Inner Pack Qty',
        render: (row) => row.attributes.casePackDimensions.quantity || '',
        className: {weight: true, right: true}
    },
    {
        field: 'casePackQty2',
        title: 'Unit Volume',
        render: (row) => <Volume {...row.attributes.casePackDimensions} />,
        className: {weight: true, right: true}
    },
];
const NOTES_FIELDS = [
    // {name: 'status', title: 'Status', render: (row) => JSON.stringify(row.status)},
    {
        field: 'notes',
        title: 'Notes',
        render: (row) => <TrimmedString str={row.notes} maxLen={15}/>,
        className: 'border-left'
    }
];
const BASE_FIELDS = [
    {
        field: 'devCode',
        title: 'Dev Code',
        render: (row) => (<Link to={`/product/${row.id}`}>{row.devCode || null}</Link>)
    },
    {field: 'SKU', title: 'SKU', render: (row) => (<Link to={`/product/${row.id}`}>{row.SKU || '(NO SKU)'}</Link>)},
    {
        field: 'name',
        title: 'Name',
        render: (row) => (<Link to={`/product/${row.id}`}>{row.name || '(not named)'}</Link>)
    },
];

const STATUS_FIELDS = [
    {
        field: 'season',
        title: 'Season',
        render: (row) => <SeasonBadge id={row.status.season}/>,
        className: 'border-left'
    },
    {field: 'statusBadge', title: 'Status', render: (row) => <StatusBadges {...row} />},
];


const sortValue = {
    status: ({status = {}}) => (status['new'] ? 1 : 0) + (status['updating'] ? 2 : 0) + (status['live'] ? 4 : 0) + (status['approved'] ? 8 : 0) + (status['discontinued'] ? 128 : 0),
};

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
            sort: PropTypes.shape({
                field: PropTypes.string,
                asc: PropTypes.bool,
            })
        }),
        loading: PropTypes.bool,
        list: PropTypes.array,
        setProductListUI: PropTypes.func.isRequired,
    };

    static defaultProps = {
        ui: {},
        list: [],
        loading: false,
    }

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
        this.onClickProduct = this.onClickProduct.bind(this);
        this.renderProductLine = this.renderProductLine.bind(this);
        this.renderSKUGroup = this.renderSKUGroup.bind(this);
        this.sorter = this.sorter.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
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

    onChangeSort(field) {
        const {sort} = this.props.ui;
        if (sort.field === field) {
            sort.asc = !sort.asc;
        } else {
            sort.field = field;
            sort.asc = true;
        }
        this.props.setProductListUI({sort});
    }

    sorter({list = [], field, asc = true}) {
        const sortMod = asc ? 1 : -1;
        const {skuGroups, seasons} = this.props.settings;
        switch (field) {
        case 'idSKUGroup':
            return list.sort((a, b) => {
                const [sga] = skuGroups.filter(sg => sg.id === a.idSKUGroup);
                const [sgb] = skuGroups.filter(sg => sg.id === b.idSKUGroup);

                return (a.idSKUGroup === b.idSKUGroup
                    ? (a.SKU === b.SKU ? 0 : (a.SKU > b.SKU ? 1 : -1))
                    : ((sga?.code || '').toLowerCase() > (sgb?.code || '').toLowerCase() ? 1 : -1)) * sortMod
            });
        case 'weight':
            return list.sort((a, b) => ((a.attributes.dimensions[field] || 0) - (b.attributes.dimensions[field] || 0)) * sortMod);
        case 'shippingWeight':
            return list.sort((a, b) => ((a.attributes.shippingDimensions[field] || 0) - (b.attributes.shippingDimensions[field] || 0)) * sortMod);
        case 'casePackQty2':
            return list.sort((a, b) => (calcVolume(a.attributes.casePackDimensions) - calcVolume(b.attributes.casePackDimensions)) * sortMod);
        case 'statusBadge':
            return list.sort((a, b) => (sortValue.status(a) - sortValue.status(b)) * sortMod);
        case 'season':
            return list.sort((a, b) => {
                const [sa] = seasons.list.filter(s => s.id === a.status.season);
                const [sb] = seasons.list.filter(s => s.id === b.status.season);
                return (sa?.id === sb?.id
                    ? (a.SKU === b.SKU ? 0 : (a.SKU > b.SKU ? 1 : -1))
                    : ((sa?.code || '').toLowerCase() > (sb?.code || '').toLowerCase() ? 1 : -1)) * sortMod;
            });
        case 'stdPrice':
        case 'stdCost':
        case 'suggestedRetailPrice':
            return list.sort((a,b) => (a[field] - b[field]) * sortMod);
        }
        return list.sort((a, b) => {
            return ((a[field] || '').toLowerCase() === (b[field] || '').toLowerCase()
                ? (a.SKU === b.SKU ? 0 : (a.SKU > b.SKU ? 1 : -1))
                : ((a[field] || '').toLowerCase() > (b[field] || '').toLowerCase() ? 1 : -1)) * sortMod;

        })
    }

    render() {
        const {list, loading, ui} = this.props;
        const {status, dimensions, categories, notes, upc, prices, page, sort, rowsPerPage} = ui;
        const fields = [
            ...BASE_FIELDS,
            ...(status ? STATUS_FIELDS : []),
            ...(categories ? CATEGORY_FIELDS : []),
            ...(upc ? UPC_FIELDS : []),
            ...(prices ? PRICE_FIELDS : []),
            ...(dimensions ? DIMENSION_FIELDS : []),
            ...(notes ? NOTES_FIELDS : []),
        ].filter(f => !!f);

        return (
            <div>
                <ProgressBar visible={loading} striped active/>
                <SortableTable data={list} fields={fields}
                               className="table-sm "
                               rowClassName={(row) => !row.active ? 'table-warning' : ''}
                               page={page} onChangePage={(page) => this.props.setProductListUI({page})}
                               rowsPerPage={rowsPerPage} onChangeRowsPerPage={(rowsPerPage) => this.props.setProductListUI({rowsPerPage})}
                               sort={sort} onChangeSort={this.onChangeSort}
                               onSelect={this.onClickProduct}
                               sorter={this.sorter} defaultSort={{field: 'SKU', asc: true}}/>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const {productList, ui, settings} = state;
    const {productListUI} = ui;
    let reFilter = new RegExp('^', 'i');
    try {
        reFilter = new RegExp(String(productListUI.filter).toLowerCase(), 'i');
    } catch (e) {
        console.log('mapStateToProps() invalid regex', JSON.stringify(productListUI.filter));
    }
    const list = productList.list
        .filter(item => !productListUI.filter || reFilter.test(item.name) || reFilter.test(item.SKU) || reFilter.test(item.UPC) || reFilter.test(item.devCode))
        .filter(item => !productListUI.active || !!item.active)
        .filter(item => !productListUI.skuGroup || item.idSKUGroup === productListUI.skuGroup)
        .filter(item => !productListUI.season || item.status.season === productListUI.season)
        .filter(item => !productListUI.statusFilter || item.status[productListUI.statusFilter])
        .filter(item => !productListUI.productLine || item.productLine === productListUI.productLine);
    return {ui: productListUI, list, loading: productList.loading, settings};
};

const mapDispatchToProps = {
    setProductListUI,
    selectProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListTable);
