import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {
    selectCurrentSKUGroup,
    selectFilteredSKUGroups,
    selectSKUGroupSort,
    setCurrentSKUGroup,
    setSKUGroupSort
} from "@/ducks/sku-groups/skuGroupsSlice.ts";
import {useState} from "react";
import {StandaloneSortableTable, TablePagination} from "@chumsinc/sortable-tables";
import type {SKUGroup, SortProps} from "chums-types";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallbackComponent from "@/components/common/ErrorFallbackComponent.tsx";
import {skuGroupFields} from "@/components/sku-group/skuGroupsFields.tsx";
import clsx from "clsx";
import {loadBaseSkuList} from "@/ducks/base-sku/actions.ts";


export default function SKUGroupsTable() {
    const list = useAppSelector(selectFilteredSKUGroups);
    const sort = useAppSelector(selectSKUGroupSort)
    const key = `${sort.field}-${sort.ascending ? 'asc' : 'desc'}--${list.length}`
    return (
        <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
            <PaginatedSkuGroupsTable list={list} sort={sort} key={key}/>
        </ErrorBoundary>
    )
}

interface PaginatedSkuGroupsTableProps {
    list: SKUGroup[];
    sort: SortProps<SKUGroup>;
}

function PaginatedSkuGroupsTable({list, sort}: PaginatedSkuGroupsTableProps) {
    const dispatch = useAppDispatch();
    const current = useAppSelector(selectCurrentSKUGroup);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const sortChangeHandler = (sort: SortProps<SKUGroup>) => {
        dispatch(setSKUGroupSort(sort));
    }

    const onSelectRow = (row: SKUGroup) => {
        dispatch(setCurrentSKUGroup(row));
        dispatch(loadBaseSkuList({idSkuGroup: row.id}))
    }
    const rowsPerPageChangeHandler = (rpp: number) => {
        setRowsPerPage(rpp);
        setPage(0);
    }


    const pagedList = list.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    return (
        <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
            <StandaloneSortableTable fields={skuGroupFields} size="xs"
                                     currentSort={sort} onChangeSort={sortChangeHandler}
                                     data={pagedList} keyField={(row) => row.id}
                                     selected={row => row.id === current?.id}
                                     rowClassName={(row) => clsx({'table-warning': !row.active})}
                                     onSelectRow={onSelectRow}/>
            <TablePagination page={page} onChangePage={setPage} size="sm"
                             rowsPerPage={rowsPerPage} rowsPerPageProps={{onChange: rowsPerPageChangeHandler}}
                             count={list.length} showFirst showLast/>
        </ErrorBoundary>
    )
}
