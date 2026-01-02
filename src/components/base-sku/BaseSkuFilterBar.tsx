import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectBaseSKUsStatus, selectSkuGroupId} from "@/ducks/base-sku/baseSkuSlice.ts";
import {loadBaseSkuList} from "@/ducks/base-sku/actions.ts";
import {Button, Col, Row} from "react-bootstrap";
import BaseSkuActiveFilter from "@/components/base-sku/BaseSkuActiveFilter.tsx";
import BaseSkuSearch from "@/components/base-sku/BaseSkuSearch.tsx";

export default function BaseSkuFilterBar() {
    const dispatch = useAppDispatch();
    const idSkuGroup = useAppSelector(selectSkuGroupId);
    const status = useAppSelector(selectBaseSKUsStatus);

    const reloadHandler = () => {
        dispatch(loadBaseSkuList({idSkuGroup: idSkuGroup}))
    }

    return (
        <Row className="g-3 align-items-baseline">
            <Col xs="auto">
                <BaseSkuSearch />
            </Col>
            <Col xs="auto">
                <BaseSkuActiveFilter />
            </Col>
            <Col />
            <Col xs="auto">
                <Button type="button" variant="primary" size="sm"
                        onClick={reloadHandler} disabled={status !== 'idle'}>
                    Reload
                </Button>
            </Col>
        </Row>
    )
}
