import {useParams} from "react-router";
import ProductEditor from "@/components/product-editor/ProductEditor.tsx";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectCurrentProduct, setCurrentProduct} from "@/ducks/product/currentProductSlice.ts";
import {useEffect, useState} from "react";
import {loadProduct} from "@/ducks/product/actions.ts";
import {Col, Nav, Row} from "react-bootstrap";
import ProductDimensions from "@/components/product-editor/ProductDimensions.tsx";

interface ContentLink {
    key: string;
    label: string;
}
const contentLinks = [
    {key: '/main', label: 'Main'},
    {key: '/dimensions', label: 'Dimensions'},
    {key: '/images', label: 'Images'},
    {key: '/inventory', label: 'Inventory'},
    {key: '/notes', label: 'Notes'},
    {key: '/tags', label: 'Tags'},
    {key: '/customFields', label: 'Custom Fields'},
    {key: '/history', label: 'History'},
] as ContentLink[];

export default function ProductContent() {
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectCurrentProduct);
    const params = useParams<'id'>();
    const [activeKey, setActiveKey] = useState<string>(contentLinks[0].key ?? '/main');

    useEffect(() => {
        if (params.id) {
            dispatch(loadProduct(params.id));
        } else {
            dispatch(setCurrentProduct(null));
        }
    }, [params, dispatch]);

    return (
        <div>
            <Row className="mb-3 g-5">
                <Col xs={12} sm="auto">
                    <h3>{product?.SKU} - {product?.name ?? 'New Product'}</h3>
                </Col>
                <Col xs={12} sm="auto">
                    <Nav defaultActiveKey="/main" variant="underline" className="mb-3" activeKey={activeKey} >
                        {contentLinks.map(link => (
                            <Nav.Link key={link.key} as="button" eventKey={link.key}
                                      onClick={() => setActiveKey(link.key)}>
                                {link.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Col>
            </Row>
            {activeKey === '/main' && (<ProductEditor/>)}
            {activeKey === '/dimensions' && (<ProductDimensions/>)}
        </div>
    )
}
