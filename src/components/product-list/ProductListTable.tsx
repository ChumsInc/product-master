import {SortableTable, TablePagination, useTableSort} from "@chumsinc/sortable-tables";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectFilteredProductList, setProductListSort} from "@/ducks/productList/productListSlice.ts";
import {useEffect, useState} from "react";
import type {SortProps} from "chums-types";
import type {FlattenedProductMaster} from "@/ducks/productList/types.ts";

export default function ProductListTable() {
    const dispatch = useAppDispatch();
    const [, setTableSort] = useTableSort<FlattenedProductMaster>()
    const data = useAppSelector(selectFilteredProductList);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    useEffect(() => {
        setPage(0);
    }, [data])

    const sortChangeHandler = (sort:SortProps<FlattenedProductMaster>)=> {
        dispatch(setProductListSort(sort));
        setTableSort(sort)
    }

    const rowsPerPageChangeHandler = (rpp:number) => {
        setRowsPerPage(rpp);
        setPage(0);
    }

    return (
        <div>
            <SortableTable data={data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                           onChangeSort={sortChangeHandler} keyField="id"/>
            <TablePagination page={page} rowsPerPage={rowsPerPage} onChangePage={setPage} count={data.length}
                             rowsPerPageProps={{
                                 onChange: rowsPerPageChangeHandler
                             }} showFirst showLast />
        </div>

    )
}
