import type {ProductStatusAttributes} from "chums-types";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectStatusFilter, setStatusFilter} from "@/ducks/productList/productListSlice.ts";
import {Dropdown} from "react-bootstrap";
import StatusDropdownItem from "@/components/status/StatusDropdownItem.tsx";
import StatusList from "@/components/status/StatusList.tsx";

export default function StatusDropdown() {
    const dispatch = useAppDispatch();
    const statusFilter = useAppSelector(selectStatusFilter);

    const changeHandler = (key: keyof ProductStatusAttributes) => {
        dispatch(setStatusFilter({[key]: !statusFilter[key]}))
    }
    return (
        <Dropdown>
            <Dropdown.Toggle size="sm" variant="outline-secondary" id="dropdown-basic">
                <StatusList status={statusFilter}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <StatusDropdownItem code="new" checked={statusFilter.new}
                                    onClick={() => changeHandler('new')}/>
                <StatusDropdownItem code="updating" checked={statusFilter.updating}
                                    onClick={() => changeHandler('updating')}/>
                <StatusDropdownItem code="approved" checked={statusFilter.approved}
                                    onClick={() => changeHandler('approved')}/>
                <StatusDropdownItem code="live" checked={statusFilter.live}
                                    onClick={() => changeHandler('live')}/>
                <StatusDropdownItem code="discontinued" checked={statusFilter.discontinued}
                                    onClick={() => changeHandler('discontinued')}/>
            </Dropdown.Menu>
        </Dropdown>
    )
}
