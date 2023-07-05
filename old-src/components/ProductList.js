import React, {Component} from 'react';
import ProductListTable from "./ProductListTable";
import ProductListFilter from "./ProductListFilter";

export default class ProductList extends Component {

    render() {
        return (
            <div>
                <ProductListFilter />
                <ProductListTable/>
            </div>
        )
    }
}
