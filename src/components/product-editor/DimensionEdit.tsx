import type {ProductDimension} from "chums-types";
import {Col, FormGroup, FormLabel, FormText, Row} from "react-bootstrap";
import {type ChangeEvent, type ReactNode, useId} from "react";
import DimensionField from "@/components/product-editor/DimensionField.tsx";
import Decimal from "decimal.js";
import numeral from "numeral";

type DimensionNotes = {
    [K in keyof ProductDimension]?: string|ReactNode;
}

export interface DimensionEditProps {
    dimension: ProductDimension|undefined;
    onChange: (dimension: ProductDimension) => void;
    showQuantity?: boolean;
    showVolume?: boolean;
    showWeight?: boolean;
    showFloatCapacity?: boolean;
    dimensionNotes?: DimensionNotes;
}

export default function DimensionEdit({dimension, onChange, showQuantity, showVolume, showWeight, showFloatCapacity, dimensionNotes}:DimensionEditProps) {
    const idLength = useId();
    const idWidth = useId();
    const idHeight = useId();
    const idVolume = useId();
    const idQuantity = useId();
    const idWeight = useId();
    const idFloatCapacity = useId();

    const volume = new Decimal(dimension?.length ?? 0)
        .times(dimension?.width ?? 0)
        .times(dimension?.height ?? 0)
        .div(dimension?.quantity ?? 1)

    const changeHandler = (field: keyof ProductDimension) => (ev: ChangeEvent<HTMLInputElement>) => {
        onChange({...(dimension ?? []), [field]: ev.target.value});
    }

    return (
        <div>
            <FormGroup as={Row} className="g-3">
                <FormLabel column xs={4} htmlFor={idLength}>
                    Length
                </FormLabel>
                <Col>
                    <DimensionField unit="in" id={idLength}
                                    value={dimension?.length ?? ''} onChange={changeHandler('length')}/>
                    <FormText className="text-secondary">{dimensionNotes?.length ?? null}</FormText>
                </Col>
            </FormGroup>
            <FormGroup as={Row} className="g-3">
                <FormLabel column xs={4} htmlFor={idWidth}>
                    Width
                </FormLabel>
                <Col>
                    <DimensionField unit="in" id={idWidth}
                                    value={dimension?.width ?? ''} onChange={changeHandler('width')}/>
                    <FormText className="text-secondary">{dimensionNotes?.width ?? null}</FormText>
                </Col>
            </FormGroup>
            <FormGroup as={Row} className="g-3">
                <FormLabel column xs={4} htmlFor={idHeight}>
                    Height
                </FormLabel>
                <Col>
                    <DimensionField unit="in" id={idHeight}
                                    value={dimension?.height ?? ''} onChange={changeHandler('height')}/>
                    <FormText className="text-secondary">{dimensionNotes?.height ?? null}</FormText>
                </Col>
            </FormGroup>
            {showQuantity && (
                <FormGroup as={Row} className="g-3">
                    <FormLabel column xs={4} htmlFor={idQuantity}>
                        Quantity
                    </FormLabel>
                    <Col>
                        <DimensionField unit="cu in" id={idQuantity}
                                        value={dimension?.quantity ?? ''} onChange={changeHandler('quantity')}/>
                        <FormText className="text-secondary">{dimensionNotes?.quantity ?? null}</FormText>
                    </Col>
                </FormGroup>
            )}
            {showVolume && (
                <FormGroup as={Row} className="g-3">
                    <FormLabel column xs={4} htmlFor={idVolume}>
                        Volume
                    </FormLabel>
                    <Col>
                        <DimensionField unit="cu in" id={idVolume} readOnly
                                        value={numeral(volume.toString()).format('0,0.00')}/>
                        <FormText className="text-secondary">{dimensionNotes?.volume ?? null}</FormText>
                    </Col>
                </FormGroup>
            )}
            {showWeight && (
                <FormGroup as={Row} className="g-3">
                    <FormLabel column xs={4} htmlFor={idWeight}>
                        Weight
                    </FormLabel>
                    <Col>
                        <DimensionField unit="lb" id={idWeight}
                                        value={dimension?.weight ?? ''} onChange={changeHandler('weight')}/>
                        <FormText className="text-secondary">{dimensionNotes?.weight ?? null}</FormText>
                    </Col>
                </FormGroup>
            )}
            {showFloatCapacity && (
                <FormGroup as={Row} className="g-3">
                    <FormLabel column xs={4} htmlFor={idFloatCapacity}>
                        Float Capacity
                    </FormLabel>
                    <Col>
                        <DimensionField unit="g" id={idFloatCapacity}
                                        value={dimension?.floatCapacity ?? ''} onChange={changeHandler('floatCapacity')}/>
                        <FormText className="text-secondary">{dimensionNotes?.floatCapacity ?? null}</FormText>
                    </Col>
                </FormGroup>
            )}
        </div>
    )
}
