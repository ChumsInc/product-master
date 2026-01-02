import {Col, Row} from "react-bootstrap";
import SKUGroupsTable from "@/components/sku-group/SKUGroupsTable.tsx";
import SkuGroupEditor from "@/components/sku-group/SkuGroupEditor.tsx";
import SkuGroupFilter from "@/components/sku-group/SkuGroupFilter.tsx";
import BaseSkuList from "@/components/base-sku/BaseSkuList.tsx";
import BaseSkuFilterBar from "@/components/base-sku/BaseSkuFilterBar.tsx";
import BaseSkuLoading from "@/components/base-sku/BaseSkuLoading.tsx";
import {useParams} from "react-router";
import {useAppDispatch} from "@/app/configureStore.ts";
import {useEffect} from "react";
import {loadSkuGroup} from "@/ducks/sku-groups/actions.ts";
import {loadBaseSkuList} from "@/ducks/base-sku/actions.ts";
import {setCurrentSKUGroup} from "@/ducks/sku-groups/currentSkuGroupSlice.ts";

export default function SKUGroupsContent() {
    const dispatch = useAppDispatch();
    const params = useParams<'id'>();

    useEffect(() => {
        if (params.id) {
            dispatch(loadSkuGroup(params.id))
            dispatch(loadBaseSkuList({idSkuGroup: params.id}))
        } else {
            dispatch(setCurrentSKUGroup(null))
        }
    }, [dispatch, params.id]);

    return (
        <div className="container-fluid">
            <h2>SKU Groups</h2>
            <Row className="g-3">
                <Col xs={12} sm={6} md={4}>
                    <SkuGroupFilter />
                    <SKUGroupsTable/>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <h3>Editor</h3>
                    <SkuGroupEditor />
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <h3>Base SKU List</h3>
                    <BaseSkuFilterBar />
                    <BaseSkuLoading />
                    <BaseSkuList defaultRowsPerPage={10} />
                </Col>
            </Row>
        </div>
    )
}
