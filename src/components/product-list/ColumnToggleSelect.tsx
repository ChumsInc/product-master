import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectColumns, setColumn} from "@/ducks/productList/productListSlice.ts";
import {Dropdown} from "react-bootstrap";
import {columns} from "@/ducks/productList/utils.ts";
import ColumnToggleItem from "@/components/product-list/ColumnToggleItem.tsx";
import type {ProductListColumns, ProductMasterColumn} from "@/ducks/productList/types.ts";
import {LocalStore} from "@chumsinc/ui-utils";
import {productListColumnsKey} from "@/utils/storageKeys.ts";

export default function ColumnToggleSelect() {
    const dispatch = useAppDispatch();
    const columnStatus = useAppSelector(selectColumns);

    const onClick = (field: ProductMasterColumn) => (checked: boolean) => {
        LocalStore.setItem<ProductListColumns>(productListColumnsKey, {...columnStatus, [field]: checked});
        dispatch(setColumn({[field]: checked}));
    }

    return (
        <Dropdown autoClose="outside">
            <Dropdown.Toggle variant="outline-secondary" size="sm">
                Columns
            </Dropdown.Toggle>
            <Dropdown.Menu style={{maxHeight: '40vh', overflowY: 'auto'}}>
                {columns.map(col => (
                        <ColumnToggleItem field={col} onClick={onClick(col)} checked={columnStatus[col]}/>
                    )
                )}
            </Dropdown.Menu>
        </Dropdown>
    )

}

