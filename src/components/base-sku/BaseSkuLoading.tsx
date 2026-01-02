import {useAppSelector} from "@/app/configureStore.ts";
import {selectBaseSKUsStatus} from "@/ducks/base-sku/baseSkuSlice.ts";
import {ProgressBar} from "react-bootstrap";

export default function BaseSkuLoading() {
    const status = useAppSelector(selectBaseSKUsStatus);
    if (status === 'idle' || status === 'rejected') {
        return null;
    }
    return (
        <ProgressBar animated now={100} style={{height: '3px'}} className="my-1"/>
    )
}
