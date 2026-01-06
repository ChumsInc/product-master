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
import {selectCurrentProduct} from "@/ducks/product/currentProductSlice.ts";

export default function ProductListTable() {
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectCurrentProduct);
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
            <div className="my-1" style={{minHeight: '0.5rem'}}>
                {status === 'loading' && <ProgressBar animated now={100} className="my-1" style={{height: '0.5rem'}}/>}
            </div>
            <div className="table-responsive">
                <SortableTable data={data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} size="xs"
                               selected={(row) => product?.id === row.id}
                               rowClassName={(row) => clsx({'table-warning': !row.active})}
                               onChangeSort={sortChangeHandler} keyField="id"/>
            </div>
            <TablePagination count={data.length} size="sm"
                             page={page} onChangePage={setPage}
                             rowsPerPage={rowsPerPage}
                             rowsPerPageProps={{
                                 onChange: rowsPerPageChangeHandler
                             }} showFirst showLast/>
        </div>

    )
}
