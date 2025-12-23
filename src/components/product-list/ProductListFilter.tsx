import {useAppDispatch} from "@/app/configureStore.ts";
import ProductLineFilter from "@/components/product-list/ProductLineFilter.tsx";
import {Button, Col, Row} from "react-bootstrap";
import SkuGroupFilter from "@/components/product-list/SkuGroupFilter.tsx";
import SeasonFilter from "@/components/product-list/SeasonFilter.tsx";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallbackComponent from "@/components/common/ErrorFallbackComponent.tsx";
import StatusFilter from "@/components/product-list/StatusFilter.tsx";
import ProductListSearch from "@/components/product-list/ProductListSearch.tsx";
import {loadProductList} from "@/ducks/productList/actions.ts";
import ColumnToggleSelect from "@/components/product-list/ColumnToggleSelect.tsx";
import ProductShowInactiveCheckbox from "@/components/product-list/ProductShowInactiveCheckbox.tsx";
import {useNavigate} from "react-router";

export default function ProductListFilter() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const reloadHandler = () => {
        dispatch(loadProductList())
    }

    const newProductHandler = () => {
        navigate('/product-edit/0');
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
            <div>
                <Row className="g-3">
                    <Col xs="auto">
                        <ProductLineFilter/>
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
                        <ProductListSearch/>
                    </Col>
                    <Col xs="auto">
                        <Button type="button" size="sm" variant="outline-secondary" onClick={newProductHandler}>New</Button>
                    </Col>
                    <Col xs="auto">
                        <Button size="sm" variant="primary" onClick={reloadHandler}>Reload</Button>
                    </Col>
                    <Col xs="auto">
                        <ColumnToggleSelect/>
                    </Col>
                </Row>
                <Row className="g-3">
                    <Col xs="auto">
                        <ProductShowInactiveCheckbox/>
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
