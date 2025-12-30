import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectCurrentSKUGroup, setCurrentSKUGroup} from "@/ducks/sku-groups/skuGroupsSlice.ts";
import {type ChangeEvent, type FormEvent, useId, useState} from "react";
import type {SKUGroup} from "chums-types";
import {Button, Col, Form, Row} from "react-bootstrap";
import ProductLineSelect from "@/components/product-line/ProductLineSelect.tsx";
import TextArea from "@chumsinc/textarea";

const newSkuGroup: SKUGroup = {
    id: 0,
    code: '',
    description: '',
    notes: '',
    active: true,
    productLine: '',
    tags: [],
}

export default function SkuGroupEditor() {
    const current = useAppSelector(selectCurrentSKUGroup);
    const key = `${current?.id ?? 'new'}-${current?.timestamp ?? 'new'}`
    return (
        <SkuGroupEditorForm current={current} key={key}/>
    )
}

function SkuGroupEditorForm({current}: { current: SKUGroup | null }) {
    const dispatch = useAppDispatch();
    const [skuGroup, setSkuGroup] = useState<SKUGroup>(current ?? newSkuGroup);
    const idCode = useId();
    const idDescription = useId();
    const idProductLine = useId();
    const idNotes = useId();
    const idActive = useId();

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
    }

    const changeHandler = (field: keyof SKUGroup) =>
        (ev: ChangeEvent<HTMLInputElement>) => {
            switch (field) {
                case 'code':
                case 'description':
                case 'notes':
                case 'productLine':
                    setSkuGroup((prev) => {
                        return {
                            ...prev,
                            [field]: ev.target.value
                        }
                    });
                    return;
                case 'active':
                    setSkuGroup((prev) => {
                        return {
                            ...prev,
                            [field]: ev.target.checked
                        }
                    });
                    return;
            }
        }

    const ProductLineChangeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        setSkuGroup((prev) => {
            return {
                ...prev,
                productLine: ev.target.value
            }
        });
    }

    const notesChangeHandler = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        setSkuGroup((prev) => {
            return {
                ...prev,
                notes: ev.target.value
            }
        });
    }

    const newSkuGroupHandler = () => {
        dispatch(setCurrentSKUGroup(null));
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group as={Row} className="g-3 align-items-center">
                <Form.Label column sm={3} as="label" htmlFor={idCode}>Code</Form.Label>
                <Col>
                    <Form.Control type="text" size="sm" id={idCode} required maxLength={10}
                                  value={skuGroup.code}
                                  onChange={changeHandler('code')}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="g-3 align-items-center">
                <Form.Label column sm={3} as="label" htmlFor={idActive}>Status</Form.Label>
                <Col>
                    <Form.Check type="checkbox" id={idActive} label="Active"
                                checked={skuGroup.active} onChange={changeHandler('active')}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="g-3 align-items-center">
                <Form.Label column sm={3} as="label" htmlFor={idDescription}>Description</Form.Label>
                <Col>
                    <Form.Control type="text" size="sm" id={idDescription}
                                  value={skuGroup.description}
                                  onChange={changeHandler('description')}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="g-3 align-items-center">
                <Form.Label column sm={3} as="label" htmlFor={idProductLine}>Product Line</Form.Label>
                <Col>
                    <ProductLineSelect size="sm"
                                       value={skuGroup.productLine} onChange={ProductLineChangeHandler}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="g-3 align-items-center">
                <Form.Label column sm={3} as="label" htmlFor={idNotes}>Notes</Form.Label>
                <Col>
                    <TextArea size="sm" minRows={3} maxRows={6}
                              value={skuGroup.notes ?? ''} onChange={notesChangeHandler} id={idNotes}/>
                </Col>
            </Form.Group>
            <Row className="g-3 justify-content-end align-items-center">
                <Col xs="auto">
                    <Button variant="outline-secondary" size="sm" type="button" onClick={newSkuGroupHandler}>
                        New SKU Group
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" type="submit" size="sm">Save</Button>
                </Col>
            </Row>
        </Form>
    )
}
