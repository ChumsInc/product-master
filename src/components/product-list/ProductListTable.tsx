import {SortableTable, TablePagination, useTableSort} from "@chumsinc/sortable-tables";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {
    selectFilteredProductList,
    selectProductListStatus,
    setProductListSort
} from "@/ducks/productList/productListSlice.ts";
import {useEffect, useState} from "react";
import type {SortProps} from "chums-types";
import type {FlattenedProductMaster} from "@/ducks/productList/types.ts";
import {ProgressBar} from "react-bootstrap";
import clsx from "clsx";

export default function ProductListTable() {
    const dispatch = useAppDispatch();
    const [, setTableSort] = useTableSort<FlattenedProductMaster>()
    const data = useAppSelector(selectFilteredProductList);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const status = useAppSelector(selectProductListStatus);

    useEffect(() => {
        setPage(() => 0);
    }, [data.length])

    const sortChangeHandler = (sort: SortProps<FlattenedProductMaster>) => {
        dispatch(setProductListSort(sort));
        setTableSort(sort)
    }

    const rowsPerPageChangeHandler = (rpp: number) => {
        setRowsPerPage(rpp);
        setPage(0);
    }

    return (
        <div>
            {status === 'loading' && <ProgressBar animated now={100} className="my-1"/>}
            <div className="table-responsive">
                <SortableTable data={data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} size="xs"
                               rowClassName={(row) => clsx({'table-warning': !row.active})}
                               onChangeSort={sortChangeHandler} keyField="id"/>
            </div>
            <TablePagination page={page} rowsPerPage={rowsPerPage} onChangePage={setPage} count={data.length}
                             rowsPerPageProps={{
                                 onChange: rowsPerPageChangeHandler
                             }} showFirst showLast/>
        </div>

    )
}
