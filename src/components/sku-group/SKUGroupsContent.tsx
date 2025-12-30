import {Col, Row} from "react-bootstrap";
import SKUGroupsTable from "@/components/sku-group/SKUGroupsTable.tsx";
import SkuGroupEditor from "@/components/sku-group/SkuGroupEditor.tsx";
import SkuGroupFilter from "@/components/sku-group/SkuGroupFilter.tsx";
import BaseSkuList from "@/components/base-sku/BaseSkuList.tsx";

export default function SKUGroupsContent() {
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
                    <BaseSkuList />
                </Col>
            </Row>
        </div>
    )
}
