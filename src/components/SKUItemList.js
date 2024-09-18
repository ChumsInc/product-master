/**
 * Created by steve on 3/24/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataTableFilter from '../common-components/DataTableFilter';
import GTIN from '../utils/GTIN';
import {connect} from 'react-redux';
import ProgressBar from "../common-components/ProgressBar";
import SortableTable from "../common-components/SortableTable";
import {assignNextColorUPC, loadItems} from "../actions/product";
import TrimmedString from "../common-components/TrimmedString";

const AssignableColorUPC = ({upc = '', onClick}) => {
    return (upc || '') === ''
        ? (
            <button className="btn btn-outline-primary btn-xs" onClick={onClick}>
                <span className="material-icons md-12">navigate_next</span>
            </button>
        )
        : GTIN.format(upc)
};

const tableFields = [
    {field: 'company', title: 'Co'},
    {field: 'ItemCode', title: 'Item'},
    {field: 'ItemCodeDesc', title: 'Desc', render: (row) => (<TrimmedString text={row.ItemCodeDesc}/>)},
    {field: 'ProductType', title: 'PT'},
    {field: 'ProductLine', title: 'PL'},
    {field: 'UDF_UPC', render: (row) => GTIN.format(row.UDF_UPC), title: 'UPC', className: 'upc'},
    {
        field: 'UDF_UPC_BY_COLOR',
        render: (row) => GTIN.format(row.UDF_UPC_BY_COLOR),
        title: 'Color UPC',
        className: 'upc'
    },
];

class SKUItemList extends Component {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        sku: PropTypes.string,
        list: PropTypes.array.isRequired,
        isAdmin: PropTypes.bool,
        loading: PropTypes.bool,
        loaded: PropTypes.bool,
        assignNextColorUPC: PropTypes.func.isRequired,
        loadItems: PropTypes.func.isRequired,
    };

    static defaultProps = {
        id: 0,
        sku: '',
        list: [],
        loading: false,
        loaded: false,
        isAdmin: false,
    };

    state = {
        selected: null,
        filter: '',
        showInactive: false,
        group: {},
        rowsPerPage: 10,
        page: 1,
    };

    constructor(props) {
        super(props);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.loadItems = this.loadItems.bind(this);
    }

    loadItems() {
        const {id, sku, loaded} = this.props;
        this.props.loadItems(sku);
    }

    componentDidMount() {
        const {id, loading, loaded} = this.props;
        if (!!id && !loading && !loaded) {
            this.loadItems();
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const {id, loading, loaded} = this.props;
        if (!!id && !loading && !loaded) {
            this.loadItems();
        }

        if (this.props.isAdmin && !prevProps.isAdmin) {
            tableFields
                .filter(f => f.field === 'UDF_UPC_BY_COLOR')
                .map(field => field.render = (row) => (
                    <AssignableColorUPC upc={row.UDF_UPC_BY_COLOR} onClick={() => this.onClickNewByColorUPC(row)}/>
                ));
        }
    }



    onChangeFilter(val) {
        this.setState({filter: val});
    }

    onClickNewByColorUPC(item, ev) {
        this.props.assignNextColorUPC(item);
    }

    render() {
        const {list, loading} = this.props;
        const {filter, showInactive, rowsPerPage, page} = this.state;


        let reFilter;
        try {
            reFilter = new RegExp(filter, 'i');
        } catch (err) {
            reFilter = /./i;
        }
        const rows = list
            .filter(item => showInactive || item.active)
            .filter(item => filter.trim() === ''
                || reFilter.test(item.ItemCode) || reFilter.test(item.ItemCodeDesc)
                || reFilter.test(item.UDF_UPC) || reFilter.test(item.UDF_UPC_BY_COLOR));
        return (
            <div>
                <div className="alert alert-warning">
                    <strong className="text-"><em>See Production/Products/SKU System</em></strong>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const {app, product} = state;
    const {id, sku} = product.selected;
    const {list, loading, loaded} = product.items;
    const {isAdmin} = app;
    return {id, sku, list, loading, loaded, isAdmin};
};

const mapDispatchToProps = {
    assignNextColorUPC,
    loadItems
};

export default connect(mapStateToProps, mapDispatchToProps)(SKUItemList);
