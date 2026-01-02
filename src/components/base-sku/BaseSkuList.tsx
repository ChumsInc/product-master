import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {StandaloneSortableTable, TablePagination} from "@chumsinc/sortable-tables";
import type {BaseSKU, SortProps} from "chums-types";
import {useState} from "react";
import {selectBaseSKUSort, selectFilteredBaseSKUs, setBaseSKUSort} from "@/ducks/base-sku/baseSkuSlice.ts";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallbackComponent from "@/components/common/ErrorFallbackComponent.tsx";
import {baseSkuListFields} from "@/components/base-sku/baseSkuListFields.tsx";
import clsx from "clsx";

export interface BaseSkuListProps {
    defaultRowsPerPage?: number;
}
export default function BaseSkuList({defaultRowsPerPage}: BaseSkuListProps) {
    const list = useAppSelector(selectFilteredBaseSKUs);
    const sort = useAppSelector(selectBaseSKUSort);
    const key = `${sort.field}:${sort.ascending ? 'asc' : 'desc'}-${list.length}`;
    return (
        <BaseSkuTable list={list} sort={sort} key={key} defaultRowsPerPage={defaultRowsPerPage}/>
    )
}

interface BaseSkuTableProps {
    list: BaseSKU[];
    sort: SortProps<BaseSKU>;
    defaultRowsPerPage?: number;
}

function baseSkuRowClassName(row:BaseSKU) {
    return clsx({
        'table-warning': row.itemStats?.activeItems === 0,
        'table-danger': !row.active || row.itemStats?.items === 0
    });
}
function BaseSkuTable({list, sort, defaultRowsPerPage}: BaseSkuTableProps) {
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage ?? 25);


    const sortChangeHandler = (sort: SortProps<BaseSKU>) => {
        dispatch(setBaseSKUSort(sort));
    }

    const rowsPerPageChangeHandler = (rpp: number) => {
        setRowsPerPage(rpp);
        setPage(0);
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
            <StandaloneSortableTable size="xs"
                                     data={list.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
                                     fields={baseSkuListFields} keyField={(row) => row.id}
                                     rowClassName={baseSkuRowClassName}
                                     currentSort={sort} onChangeSort={sortChangeHandler}/>
            <TablePagination count={list.length} size="sm"
                             page={page} rowsPerPage={rowsPerPage} onChangePage={setPage}
                             rowsPerPageProps={{onChange: rowsPerPageChangeHandler}}
                             showFirst showLast/>
        </ErrorBoundary>
    )

}
