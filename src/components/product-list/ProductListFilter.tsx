import {useAppDispatch} from "@/app/configureStore.ts";
import {useId, useState} from "react";
import ProductLineFilter from "@/components/product-list/ProductLineFilter.tsx";
import {Button, Col, FormCheck, Row} from "react-bootstrap";
import SkuGroupFilter from "@/components/product-list/SkuGroupFilter.tsx";
import SeasonFilter from "@/components/product-list/SeasonFilter.tsx";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallbackComponent from "@/components/common/ErrorFallbackComponent.tsx";
import StatusFilter from "@/components/product-list/StatusFilter.tsx";
import ProductListSearch from "@/components/product-list/ProductListSearch.tsx";
import {loadProductList} from "@/ducks/productList/actions.ts";
import ColumnToggleSelect from "@/components/product-list/ColumnToggleSelect.tsx";

export default function ProductListFilter() {
    const [includeInactive, setIncludeInactive] = useState(false);
    const dispatch = useAppDispatch();
    const showInactiveId = useId();

    const reloadHandler = () => {
        dispatch(loadProductList())
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
            <div>
                <Row className="g-3">
                    <Col xs="auto">
                        <ProductLineFilter includeInactive={includeInactive}/>
                    </Col>
                    <Col xs="auto">
                        <SkuGroupFilter/>
                    </Col>
                    <Col xs="auto">
                        <SeasonFilter/>
                    </Col>
                    <Col xs="auto">
                        <StatusFilter/>
                    </Col>
                    <Col>
                        <ProductListSearch />
                    </Col>
                    <Col xs="auto">
                        <Button size="sm" variant="primary" onClick={reloadHandler}>Reload</Button>
                    </Col>
                    <Col xs="auto">

                        {/*<Link to="/product/0" onClick={this.onClickNewProduct} className="btn btn-outline-warning btn-sm">New*/}
                        {/*    Product</Link>*/}
                    </Col>
                </Row>
                <Row className="g-3">
                    <Col xs="auto">
                        <FormCheck type="checkbox" label="Include Inactive"
                                   id={showInactiveId}
                                   onChange={(e) => setIncludeInactive(e.target.checked)}/>
                    </Col>
                    <Col xs="auto">
                        <ColumnToggleSelect/>
                    </Col>
                    {/*<FormGroup label="Display" labelClassName="mr-3">*/}
                    {/*    <CheckBoxInline checked={active} field="active" onChange={this.onToggleSection}*/}
                    {/*                    label="Only Active"/>*/}
                    {/*    <CheckBoxInline checked={status} field="status" onChange={this.onToggleSection} label={'Status'}/>*/}
                    {/*    <CheckBoxInline checked={categories} field="categories" onChange={this.onToggleSection}*/}
                    {/*                    label={'Categories'}/>*/}
                    {/*    <CheckBoxInline checked={upc} field="upc" onChange={this.onToggleSection} label={'UPC'}/>*/}
                    {/*    <CheckBoxInline checked={prices} field="prices" onChange={this.onToggleSection} label={'Prices'}/>*/}
                    {/*    <CheckBoxInline checked={dimensions} field="dimensions" onChange={this.onToggleSection}*/}
                    {/*                    label={'Dimensions'}/>*/}
                    {/*    <CheckBoxInline checked={notes} field="notes" onChange={this.onToggleSection} label={'Notes'}/>*/}
                    {/*</FormGroup>*/}
                </Row>
            </div>
        </ErrorBoundary>
    )
}
