import {useAppDispatch} from "../../../app/configureStore";
import {productStatusAttributes} from "../../settings/statusAttributes";
import React from "react";
import {useSelector} from "react-redux";
import {selectCurrentProduct} from "../selectors";
import {ToggleButton} from "chums-components";


const ProductStatusEditor = () => {
    const dispatch = useAppDispatch();
    const {status} = useSelector(selectCurrentProduct)
    const onSelectStatus = (statusCode:string) => {
        console.log(statusCode);
    }
    return (
        <div className="d-flex flex-row">
            {productStatusAttributes.map(s => (
                <ToggleButton id={`pse--${s.code}`} color={s.className}
                              checked={!!status[s.code]} onChange={() => onSelectStatus(s.code)} >
                    {s.title} {status[s.code] ? ' ✔' : ' '}
                </ToggleButton>
            ))}
        </div>
    )
}

export default ProductStatusEditor;
