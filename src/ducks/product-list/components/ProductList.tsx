import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import TrimmedString from "../../../components/TrimmedString";
import {ProductListSortProps, ProductListTableField, productListTableKey} from "../actionTypes";
import Dimension from "../../../components/Dimension";
import ProductLineText from "../../settings/components/ProductLineText";
import GTIN from "../../../utils/GTIN";
import numeral from "numeral";
import SkuGroupText from "../../settings/components/SKUGroupText";
import Weight from "../../../components/Weight";
import Volume from "../../../components/Volume";
import SeasonBadge from "../../seasons/SeasonBadge";
import StatusBadges from "./StatusBadges";
import {useDispatch, useSelector} from "react-redux";
import {
    selectFilteredProductListLength,
    selectPagedProductList,
    selectProductListLength, selectProductListLoaded,
    selectProductListLoading
} from "../selectors";
import {Alert, FormCheck, SortableTable, SpinnerButton} from "chums-components";
import {getLocalStorage, setLocalStorage, storageKeys} from "../../../utils/localStorage";
import {setPageAction, ConnectedTable, ConnectedPager} from "chums-connected-components";
import {loadProductListAction} from "../index";
import {useAppDispatch} from "../../../app/configureStore";
import {ProductMaster} from "chums-types";


const CATEGORY_FIELDS: ProductListTableField[] = [
    {
        field: 'productLine',
        title: 'Product Line',
        sortable: true,
        render: (row) => <ProductLineText productLine={row.productLine}/>,
        className: 'border-start'
    },
    {field: 'category', title: 'Category', sortable: true, render: (row) => row.category || '-',},
    {field: 'idSKUGroup', title: 'SKU Group', sortable: true, render: (row) => <SkuGroupText id={row.idSKUGroup}/>,},
];
const UPC_FIELDS: ProductListTableField[] = [
    {
        field: 'UPC',
        title: 'UPC',
        sortable: true,
        render: (row) => GTIN.formatUPC(row.UPC),
        className: 'no-break center border-start'
    }
];

const PRICE_FIELDS: ProductListTableField[] = [
    {
        field: 'stdPrice',
        title: 'Wholesale',
        sortable: true,
        render: ({stdPrice}) => !!Number(stdPrice) ? numeral(stdPrice).format('$0,0.00') : '',
        className: 'right border-start'
    },
    {
        field: 'suggestedRetailPrice',
        title: 'MSRP',
        sortable: true,
        render: ({suggestedRetailPrice: msrp}) => !!Number(msrp) ? numeral(msrp).format('$0,0.00') : '',
        className: 'right'
    },
];

const DIMENSION_FIELDS: ProductListTableField[] = [
    {
        field: 'attributes.dimensions',
        title: 'Dimensions (in)',
        render: (row) => <Dimension dimension={row.attributes?.dimensions}/>,
        className: 'dimensions border-start'
    },
    {
        field: 'attributes.dimensions.weight',
        title: 'Weight (lb)',
        sortable: true,
        render: (row) => <Weight weight={row.attributes?.dimensions?.weight}/>,
        className: {weight: true, 'text-end': true}
    },
    {
        field: 'attributes.shippingDimensions',
        title: 'Packaged Dimensions (in)',
        render: (row) => <Dimension dimension={row.attributes?.shippingDimensions}/>,
        className: 'dimensions border-start'
    },
    {
        field: 'attributes.shippingDimensions.weight',
        title: 'Packaged Weight (lb)',
        sortable: true,
        render: (row) => <Weight weight={row.attributes?.shippingDimensions?.weight} />,
        className: {weight: true, right: true}
    },
    {
        field: 'attributes.casePackDimensions',
        title: 'Inner Pack Dimensions (in)',
        render: (row) => <Dimension dimension={row.attributes?.casePackDimensions}/>,
        className: 'dimensions border-start'
    },
    {
        field: 'attributes.casePackDimensions.quantity',
        title: 'Inner Pack Qty',
        sortable: true,
        render: (row) => row.attributes?.casePackDimensions?.quantity || '',
        className: {weight: true, right: true}
    },
    {
        field: 'attributes.casePackDimensions.length',
        title: 'Unit Volume',
        sortable: true,
        render: (row) => <Volume  dimensions={row.attributes?.casePackDimensions} />,
        className: {weight: true, right: true}
    },
];
const NOTES_FIELDS: ProductListTableField[] = [
    // {name: 'status', title: 'Status', render: (row) => JSON.stringify(row.status)},
    {
        field: 'notes',
        title: 'Notes',
        sortable: true,
        render: (row) => <TrimmedString str={row.notes} maxLen={15}/>,
        className: 'border-start'
    }
];
const BASE_FIELDS: ProductListTableField[] = [
    {
        field: 'devCode',
        title: 'Dev Code',
        sortable: true,
        render: (row) => (<Link to={`/product/${row.id}`}>{row.devCode || '-'}</Link>)
    },
    {field: 'SKU', title: 'SKU', sortable: true, render: (row) => (<Link to={`/product/${row.id}`}>{row.SKU || '-'}</Link>)},
    {
        field: 'name',
        title: 'Name',
        sortable: true,
        render: (row) => (<Link to={`/product/${row.id}`}>{row.name || '(not named)'}</Link>)
    },
    {field: 'itemQuantity', title: 'Active Items', sortable: true, className: 'text-end', render: (row) => row.itemQuantity || ''}
];

const STATUS_FIELDS: ProductListTableField[] = [
    {
        field: 'season',
        title: 'Season',
        sortable: true,
        render: (row) => <SeasonBadge code={row.season?.code}/>,
        className: 'border-start'
    },
    {field: 'status', title: 'Status', render: (row) => <StatusBadges status={row.status} />},
];

interface FieldToggles {
    status: boolean,
    categories: boolean,
    UPC: boolean,
    prices: boolean,
    dimensions: boolean,
    notes: boolean,
}

const defaultFields:FieldToggles = getLocalStorage(storageKeys.productList.fields) || {
    status: true,
    categories: true,
    UPC: true,
    prices: false,
    dimensions: false,
    notes: false,
}

function getFields(fieldToggles:FieldToggles):ProductListTableField[] {
    return [
        ...BASE_FIELDS,
        ...(fieldToggles.status ? STATUS_FIELDS : []),
        ...(fieldToggles.categories ? CATEGORY_FIELDS : []),
        ...(fieldToggles.UPC ? UPC_FIELDS : []),
        ...(fieldToggles.prices ? PRICE_FIELDS : []),
        ...(fieldToggles.dimensions ? DIMENSION_FIELDS : []),
        ...(fieldToggles.notes ? NOTES_FIELDS : []),
    ].filter(f => !!f);
}

const defaultTableSort:ProductListSortProps = {
    field: 'SKU',
    ascending: true,
}

const rowClassName = (row:ProductMaster) => ({
    'table-warning': !row.active,
    'table-danger': row.productType === 'D'
})

const ProductList = ({}) => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectProductListLoading);
    const loaded = useSelector(selectProductListLoaded);
    const list = useSelector(selectPagedProductList);
    const filteredLength = useSelector(selectFilteredProductListLength);
    const length = useSelector(selectProductListLength);

    const [fields, setFields] = useState<ProductListTableField[]>(getFields(defaultFields));
    const [fieldToggles, setFieldToggles] = useState({...defaultFields});

    useEffect(() => {
        const savedFields:Partial<FieldToggles>|null = getLocalStorage(storageKeys.productList.fields);
        if (savedFields) {
            let currentFieldToggles = {
                ...fieldToggles,
                ...savedFields,
            }
            setFieldToggles(currentFieldToggles);
            setFields(getFields(currentFieldToggles));
        }
        if (!loaded && !loading) {
            dispatch(loadProductListAction());
        }
    }, [])

    const sortChangeHandler = () => {
        dispatch(setPageAction({key: productListTableKey, page: 1}));
    }

    const onToggleFields = (key: keyof FieldToggles) => {
        const nextToggles:FieldToggles = {...fieldToggles, [key]: !fieldToggles[key]};
        setLocalStorage(storageKeys.productList.fields, nextToggles);
        setFieldToggles(nextToggles);
        setFields(getFields(nextToggles));
    }


    return (
        <div>
            <div className="row g-3 align-items-baseline">
                <div className="col-auto">Column Groups</div>
                <div className="col-auto">
                    <FormCheck label="Status" checked={fieldToggles.status} onChange={() => onToggleFields('status')} type="checkbox" />
                </div>
                <div className="col-auto">
                    <FormCheck label="UPC" checked={fieldToggles.UPC} onChange={() => onToggleFields('UPC')} type="checkbox" />
                </div>
                <div className="col-auto">
                    <FormCheck label="Categories" checked={fieldToggles.categories} onChange={() => onToggleFields('categories')} type="checkbox" />
                </div>
                <div className="col-auto">
                    <FormCheck label="Prices" checked={fieldToggles.prices} onChange={() => onToggleFields('prices')} type="checkbox" />
                </div>
                <div className="col-auto">
                    <FormCheck label="Dimensions" checked={fieldToggles.dimensions} onChange={() => onToggleFields('dimensions')} type="checkbox" />
                </div>
                <div className="col-auto">
                    <FormCheck label="Notes" checked={fieldToggles.notes} onChange={() => onToggleFields('notes')} type="checkbox" />
                </div>
            </div>
            <ConnectedTable tableKey={productListTableKey} size="xs" fields={fields} data={list}
                            defaultSort={defaultTableSort} keyField="id" onChangeSort={sortChangeHandler}
                            rowClassName={rowClassName} />
            {!loading && !filteredLength && <Alert color="info">No products match the current filters</Alert>}
            <ConnectedPager pageSetKey={productListTableKey} dataLength={filteredLength} filtered={filteredLength !== length} />
        </div>
    )
}

export default ProductList;
