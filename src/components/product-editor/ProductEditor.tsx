import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectCurrentProduct, selectCurrentProductStatus} from "@/ducks/product/currentProductSlice.ts";
import {Button, Col, Form, FormCheck, InputGroup, ProgressBar, Row} from "react-bootstrap";
import {type ChangeEvent, type FormEvent, useCallback, useEffect, useId, useState} from "react";
import type {ProductMaster, ProductStatusAttributes} from "chums-types";
import {newProduct} from "@/ducks/product/utils.ts";
import StatusDropdown from "@/components/status/StatusDropdown.tsx";
import SkuGroupSelect from "@/components/common/SkuGroupSelect.tsx";
import CollectionSelect from "@/components/common/CollectionSelect.tsx";
import SeasonSelect from "@/components/season/SeasonSelect.tsx";
import {formatGTIN} from "@chumsinc/gtin-tools";
import TextArea from "@chumsinc/textarea";
import SeasonBadge from "@/components/season/SeasonBadge.tsx";
import isEqual from 'fast-deep-equal'
import Alert from "react-bootstrap/Alert";
import {useNavigate} from "react-router";
import {loadProduct, saveProduct} from "@/ducks/product/actions.ts";

export default function ProductEditor() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const product = useAppSelector(selectCurrentProduct);
    const status = useAppSelector(selectCurrentProductStatus);
    const [currentProduct, setCurrentProduct] = useState<ProductMaster>(product ?? newProduct);
    const idDevCode = useId();
    const idName = useId();
    const idActive = useId();
    const idStatus = useId();
    const idSKU = useId();
    const idSKUGroup = useId();
    const idCollection = useId();
    const idSeason = useId();
    const idBaseUPC = useId();
    const idNotes = useId();
    const idSellAsSelf = useId();
    const idSellAsMix = useId();
    const idSellAsColors = useId();
    const idStdPrice = useId();
    const idMSRP = useId();
    const idStdCost = useId();

    const updateCurrentProduct = useCallback((arg: Partial<ProductMaster>) => {
        setCurrentProduct(prev => ({...prev, ...arg}));
    }, [])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentProduct(product ?? newProduct);
    }, [product]);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(saveProduct(currentProduct));
    }


    const changeHandler = (field: keyof ProductMaster) => (ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        switch (field) {
            case 'active':
            case 'sellAsSelf':
            case 'sellAsMix':
            case 'sellAsColors':
                updateCurrentProduct({[field]: (ev as ChangeEvent<HTMLInputElement>).target.checked});
                return;
            case 'stdCost':
            case 'stdPrice':
            case 'suggestedRetailPrice':
                updateCurrentProduct({[field]: (ev as ChangeEvent<HTMLInputElement>).target.value});
                return;

            default:
                updateCurrentProduct({[field]: ev.target.value});
        }

    }

    const statusChangeHandler = (arg: ProductStatusAttributes) => {
        const status = currentProduct.status ?? {};
        updateCurrentProduct({status: {...status, ...arg}});
    }

    const reloadHandler = () => {
        setCurrentProduct(product ?? newProduct);
        dispatch(loadProduct(currentProduct.id));
    }

    const newProductHandler = () => {
        navigate('/product-edit/0');
    }

    return (
        <div>
            {['loading', 'saving'].includes(status) && (
                <ProgressBar animated now={100} label={`${status}...`} variant="info" className="my-1"/>
            )}
            <Form onSubmit={submitHandler}>
                <Row className="g-3">
                    <Col xs={12} md={4}>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label" htmlFor={idName}>Name</Form.Label>
                            <Col>
                                <Form.Control type="text" size="sm" id={idName} required
                                              value={currentProduct.name ?? ''}
                                              onChange={changeHandler('name')}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label" htmlFor={idSKU}>SKU</Form.Label>
                            <Col>
                                <Form.Control size="sm" id={idSKU}
                                              value={currentProduct?.SKU ?? ''}
                                              onChange={changeHandler('SKU')}/>
                                <Form.Text className="text-muted">
                                    SKU is the unique identifier for this product.
                                </Form.Text>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label" htmlFor={idDevCode}>Dev Code</Form.Label>
                            <Col>
                                <Form.Control type="text" size="sm" id={idDevCode}
                                              value={currentProduct.devCode ?? ''}
                                              onChange={changeHandler('devCode')}/>
                                <Form.Text className="text-muted">
                                    Dev Code is used for identification before a SKU has been assigned.
                                </Form.Text>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3}>Active</Form.Label>
                            <Col>
                                <FormCheck id={idActive} type="checkbox" label="Active - shows in SKU System"
                                           checked={currentProduct.active ?? false}
                                           onChange={changeHandler('active')}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label" htmlFor={idStatus}>Status</Form.Label>
                            <Col>
                                <StatusDropdown id={idStatus}
                                                status={currentProduct.status} onChange={statusChangeHandler}
                                                buttonAttributes={{style: {width: '100%'}}}/>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label" htmlFor={idSeason}>Season</Form.Label>
                            <Col>
                                <Row className="g-3 align-items-center">
                                    {currentProduct.season && (
                                        <Col xs="auto">
                                            <SeasonBadge seasonId={currentProduct.season?.id ?? 0}/>
                                        </Col>
                                    )}
                                    <Col>
                                        <SeasonSelect size="sm" id={idSeason}
                                                      value={currentProduct.season?.id ?? 0}
                                                      onChange={(season) => {
                                                          updateCurrentProduct({season: season ?? undefined})
                                                      }}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label" htmlFor={idSKUGroup}>SKU Group</Form.Label>
                            <Col>
                                <SkuGroupSelect size="sm" id={idSKUGroup}
                                                value={currentProduct.idSKUGroup}
                                                onChange={(id) => {
                                                    updateCurrentProduct({idSKUGroup: id ?? 0})
                                                }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label" htmlFor={idCollection}>Collection</Form.Label>
                            <Col>
                                <CollectionSelect size="sm" id={idCollection}
                                                  value={currentProduct.subCategory ?? ''}
                                                  onChange={(ev) => {
                                                      updateCurrentProduct({subCategory: ev.target.value})
                                                  }}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label" htmlFor={idBaseUPC}>Base UPC</Form.Label>
                            <Col>
                                <Form.Control size="sm" id={idBaseUPC}
                                              value={formatGTIN(currentProduct.UPC, true)}
                                              onChange={changeHandler('UPC')}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label" htmlFor={idNotes}>Notes</Form.Label>
                            <Col>
                                <TextArea id={idNotes} size="sm" minRows={3} maxRows={10}
                                          value={currentProduct.notes ?? ''} onChange={changeHandler('notes')}/>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label">Sell As</Form.Label>
                            <Col>
                                <Form.Check inline id={idSellAsSelf} type="checkbox" label="Self"
                                            checked={currentProduct.sellAsSelf}
                                            onChange={changeHandler('sellAsSelf')}/>
                                <Form.Check inline id={idSellAsMix} type="checkbox" label="Mix"
                                            checked={currentProduct.sellAsMix}
                                            onChange={changeHandler('sellAsMix')}/>
                                <Form.Check inline id={idSellAsColors} type="checkbox" label="Colors"
                                            checked={currentProduct.sellAsColors}
                                            onChange={changeHandler('sellAsColors')}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label" htmlFor={idStdCost}>Standard Cost</Form.Label>
                            <Col>
                                <InputGroup size="sm">
                                    <InputGroup.Text role="presentation">$</InputGroup.Text>
                                    <Form.Control size="sm" id={idStdCost} type="number" step="0.0001"
                                                  value={currentProduct.stdCost ?? ''}
                                                  onChange={changeHandler('stdCost')}/>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label" htmlFor={idStdPrice}>Standard Price</Form.Label>
                            <Col>
                                <InputGroup size="sm">
                                    <InputGroup.Text role="presentation">$</InputGroup.Text>
                                    <Form.Control size="sm" id={idStdPrice} type="number" step="0.01"
                                                  value={currentProduct.stdPrice ?? ''}
                                                  onChange={changeHandler('stdPrice')}/>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="g-3 align-items-baseline">
                            <Form.Label column xs={3} as="label" htmlFor={idMSRP}>Retail Price</Form.Label>
                            <Col>
                                <InputGroup size="sm">
                                    <InputGroup.Text role="presentation">$</InputGroup.Text>
                                    <Form.Control size="sm" id={idMSRP} type="number" step="0.01"
                                                  value={currentProduct.suggestedRetailPrice ?? ''}
                                                  onChange={changeHandler('suggestedRetailPrice')}/>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="g-3 justify-content-end">
                    <Col>
                        {!isEqual(currentProduct, product ?? newProduct) && (
                            <Alert variant="warning" className="my-1">
                                Don't forget to save your changes!
                            </Alert>
                        )}
                    </Col>
                    <Col xs="auto">
                        <Button variant="outline-secondary" size="sm" type="button"
                                disabled={currentProduct.id === 0}
                                onClick={reloadHandler}>Reload</Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="outline-secondary" size="sm" type="button"
                                onClick={newProductHandler}>New Product</Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="primary" size="sm" type="submit" disabled={status !== 'idle'}>Save</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
