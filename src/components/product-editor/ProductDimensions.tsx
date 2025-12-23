import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectCurrentProduct, selectCurrentProductStatus} from "@/ducks/product/currentProductSlice.ts";
import {type ChangeEvent, type FormEvent, useCallback, useEffect, useId, useState} from "react";
import {newProduct} from "@/ducks/product/utils.ts";
import type {ProductAttributes, ProductDimension} from "chums-types";
import {Button, Card, Col, Form, FormLabel, ProgressBar, Row} from "react-bootstrap";
import DimensionEdit from "@/components/product-editor/DimensionEdit.tsx";
import TextArea from "@chumsinc/textarea";
import {loadProduct, saveProductAttributes} from "@/ducks/product/actions.ts";
import isEqual from "fast-deep-equal";
import Alert from "react-bootstrap/esm/Alert";

type DimensionAttributes = Pick<ProductAttributes, 'dimensions' | 'shippingDimensions' | 'casePackDimensions'>;
export default function ProductDimensions() {
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectCurrentProduct);
    const status = useAppSelector(selectCurrentProductStatus);
    const [attributes, setAttributes] = useState<ProductAttributes>(product?.attributes ?? newProduct.attributes ?? {});
    const idDimensionNotes = useId();
    const updateAttributes = useCallback(
        (field: keyof DimensionAttributes, value: Partial<ProductDimension>) => {
            setAttributes(prev => {
                const arg = prev[field] ?? {};
                return {
                    ...prev,
                    [field]: {...arg, ...value}
                }
            });
        }, [])

    useEffect(() => {
        setAttributes(product?.attributes ?? newProduct.attributes ?? {});
    }, [product]);

    const notesChangeHandler = (ev:ChangeEvent<HTMLTextAreaElement>) => {
        setAttributes({...attributes, dimensionNotes: ev.target.value});
    }

    const changeHandler = (field: keyof DimensionAttributes) =>
        (value: Partial<ProductDimension>) => {
            updateAttributes(field, value);
        }

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (!product || !product.id) {
            return;
        }
        dispatch(saveProductAttributes({id: product.id, attributes}))
    }

    const reloadHandler = () => {
        if (!product || !product.id) {
            return;
        }
        dispatch(loadProduct(product.id))
    }

    return (
        <Form onSubmit={submitHandler} className="mb-3">
            {['saving', 'loading'].includes(status) &&
                <ProgressBar animated now={100} label={`${status}`} className="my-1"/>}
            <Row className="g-3 mb-3 align-items-center justify-content-between">
                <Col>
                    {!isEqual(attributes, product?.attributes ?? newProduct.attributes ?? {}) && (
                        <Alert variant="warning" className="my-1">
                            Don't forget to save your changes!
                        </Alert>
                    )}
                </Col>
                <Col xs="auto">
                    <Button variant="outline-secondary" size="sm" type="button"
                            disabled={product?.id === 0}
                            onClick={reloadHandler}>Reload Product</Button>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" size="sm" type="submit" disabled={status !== 'idle'}>
                        Save Dimensions
                    </Button>
                </Col>
            </Row>
            <div className="my-3">
                <FormLabel htmlFor={idDimensionNotes}>Notes</FormLabel>
                <TextArea size="sm" id={idDimensionNotes}
                          value={attributes.dimensionNotes} onChange={notesChangeHandler}
                          minRows={4}
                          maxRows={20}/>
            </div>
            <Row className="g-3">
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Header>
                            <h4>Product Dimensions & Attributes</h4>
                        </Card.Header>
                        <Card.Body>
                            <DimensionEdit dimension={attributes.dimensions}
                                           onChange={changeHandler('dimensions')}
                                           showWeight showFloatCapacity
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Header>
                            <h4>Packaged Dimensions</h4>
                        </Card.Header>
                        <Card.Body>
                            <DimensionEdit dimension={attributes.shippingDimensions}
                                           onChange={changeHandler('shippingDimensions')}
                                           showWeight
                                           dimensionNotes={{
                                               height: (
                                                   <ul>
                                                       <li>For small items measure 6 as hangs on a peg and divide by 6
                                                       </li>
                                                       <li>Used to calculate how many fit on a peg</li>
                                                   </ul>
                                               ),
                                               weight: (
                                                   <ul>
                                                       <li>For small items pull 60 and divide total by 60</li>
                                                       <li>For large items, pull 1</li>
                                                       <li>Used to calculate the weight of a Sales Order.</li>
                                                   </ul>
                                               ),
                                               floatCapacity: 'Float capacity of the package'
                                           }}
                            />
                        </Card.Body>
                        <Card.Footer>
                            <div className="text-secondary fs-6 mb-3">
                                Product with packaging.
                            </div>
                            <div className="text-secondary fs-6">
                                The measurement of a single packaged unit as it hangs on a peg or sits on a shelf. Used
                                in
                                item setup sheets and for planning purposes on the sales floor.
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Header>
                            <h4>Inner Pack Dimensions</h4>
                        </Card.Header>
                        <Card.Body>
                            <div className="text-secondary fs-6">

                            </div>
                            <DimensionEdit dimension={attributes.casePackDimensions}
                                           onChange={changeHandler('casePackDimensions')}
                                           showQuantity showVolume
                                           dimensionNotes={{
                                               height: (
                                                   <ul>
                                                       <li>For small items measure 6 as hangs on a peg and divide by 6
                                                       </li>
                                                       <li>Used to calculate how many fit on a peg</li>
                                                   </ul>
                                               ),
                                               weight: (
                                                   <ul>
                                                       <li>For small items pull 60 and divide total by 60</li>
                                                       <li>For large items, pull 1</li>
                                                       <li>Used to calculate the weight of a Sales Order.</li>
                                                   </ul>
                                               ),
                                               volume: 'Used to calculate package volume and entered into Sage for landed cost.'
                                           }}
                            />
                        </Card.Body>
                        <Card.Footer>
                            <div className="text-secondary fs-6 mb-3">
                                The measurement of the inner pack as received from the manufacturer. Used in item setup
                                sheets.
                            </div>
                            <div className="text-secondary fs-6">
                                <div>Small items are 6 packs or 10 packs</div>
                                <div>Large items are 1 packs (single item)</div>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Form>
    )
}
