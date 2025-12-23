import {Dropdown} from "react-bootstrap";
import {columns, loadColumnStatus, saveColumnStatus} from "@/ducks/productList/utils.ts";
import ColumnToggleItem from "@/components/product-list/ColumnToggleItem.tsx";
import type {ProductListColumns, ProductMasterColumn} from "@/ducks/productList/types.ts";
import {useEffect, useState} from "react";
import {useTableContext} from "@chumsinc/sortable-tables";

export default function ColumnToggleSelect() {
    const [columnStatus, setColumnStatusState] = useState<ProductListColumns>(loadColumnStatus())
    const {setFields} = useTableContext();

    useEffect(() => {
        setFields((prev) => {
            return prev.map(f => ({...f, visible: columnStatus[f.field]}))
        })
    }, [columnStatus, setFields]);

    const onClick = (field: ProductMasterColumn) => (visible: boolean) => {
        setColumnStatusState(prev => {
            const nextState = {...prev, [field]: visible};
            saveColumnStatus(nextState);
            return nextState;
        })
    }

    return (
        <Dropdown autoClose="outside">
            <Dropdown.Toggle variant="outline-secondary" size="sm">
                Columns
            </Dropdown.Toggle>
            <Dropdown.Menu style={{maxHeight: '40vh', overflowY: 'auto'}}>
                {columns.map(col => (
                        <ColumnToggleItem key={col} field={col} onChangeVisibility={onClick(col)}
                                          disabled={col === 'SKU'}
                                          visible={columnStatus[col]}/>
                    )
                )}
            </Dropdown.Menu>
        </Dropdown>
    )

}

