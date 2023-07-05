import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch} from "../../../app/configureStore";
import {useSelector} from "react-redux";
import {selectProductListStatusFilter} from "../selectors";
import CustomColorButton from "../../../components/CustomColorButton";
import classNames from "classnames";
import {productStatusAttributes} from "../../settings/statusAttributes";
import {ProductStatusAttributes} from "chums-types";
import {setListStatusFilterAction} from "../index";

const ProductStatusAttributesFilter = () => {
    const dispatch = useAppDispatch();
    const status = useSelector(selectProductListStatusFilter);

    const [showDropDown, setShowDropDown] = useState(false);

    const clickListener = (ev:MouseEvent) => {
        if (ev.target && !(ev.target as HTMLElement)?.closest('#product-list-status-attributes-filter')) {
            setShowDropDown(false);
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickListener);
        return () => {
            window.removeEventListener('click', clickListener)
        }
    }, [])

    const onSelectStatus = (code: keyof ProductStatusAttributes|'') => {
        dispatch(setListStatusFilterAction(code));
        setShowDropDown(false);
    }

    const [selected] = productStatusAttributes.filter(ps => ps.code === status);

    return (
        <div className="dropdown" id="product-list-status-attributes-filter">
            <button className={classNames(`btn btn-sm dropdown-toggle`, {[`btn-${selected?.className}`]: !!selected?.className})}
                onClick={() => setShowDropDown(!showDropDown)}>
                {selected?.title || 'Filter by Status'}
            </button>
            <div className={classNames("dropdown-menu p-1 mt-1", {show: showDropDown})}>
                <div className="d-flex flex-column">
                    <button className="mb-1 btn btn-sm btn-secondary" onClick={() => onSelectStatus('')}>All</button>
                    {productStatusAttributes.map(s => (
                        <button key={s.code} className={`mb-1 btn btn-sm btn-${s.className}`}
                                onClick={() => onSelectStatus(s.code)}>
                            {s.title} {selected?.code === s.code ? ' ✔' : ''}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductStatusAttributesFilter;
