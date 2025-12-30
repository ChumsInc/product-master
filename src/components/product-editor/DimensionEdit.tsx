import type {ProductDimension} from "chums-types";
import {Col, FormGroup, FormText, Row} from "react-bootstrap";
import {type ChangeEvent, type ReactNode} from "react";
import DimensionField from "@/components/product-editor/DimensionField.tsx";
import Decimal from "decimal.js";
import numeral from "numeral";

type DimensionNotes = {
    [K in keyof ProductDimension]?: string | ReactNode;
}

export interface DimensionEditProps {
    dimension: ProductDimension | undefined;
    onChange: (dimension: ProductDimension) => void;
    showQuantity?: boolean;
    showVolume?: boolean;
    showWeight?: boolean;
    showFloatCapacity?: boolean;
    dimensionNotes?: DimensionNotes;
}

export default function DimensionEdit({
                                          dimension,
                                          onChange,
                                          showQuantity,
                                          showVolume,
                                          showWeight,
                                          showFloatCapacity,
                                          dimensionNotes
                                      }: DimensionEditProps) {

    const volume = new Decimal(dimension?.length ?? 0)
        .times(dimension?.width ?? 0)
        .times(dimension?.height ?? 0)
        .div(dimension?.quantity ?? 1)

    const changeHandler = (field: keyof ProductDimension) => (ev: ChangeEvent<HTMLInputElement>) => {
        onChange({...(dimension ?? []), [field]: ev.target.value});
    }

    return (
        <div>
            <FormGroup as={Row} className="g-3 mb-1">
                <Col xs={12} sm={4}>
                    <DimensionField label="Length" unit="in"
                                    value={dimension?.length ?? ''} onChange={changeHandler('length')}/>
                    <FormText className="text-secondary">{dimensionNotes?.length ?? null}</FormText>
                </Col>
                <Col xs={12} sm={4}>
                    <DimensionField label="Width" unit="in"
                                    value={dimension?.width ?? ''} onChange={changeHandler('width')}/>
                    <FormText className="text-secondary">{dimensionNotes?.width ?? null}</FormText>
                </Col>
                <Col xs={12} sm={4}>
                    <DimensionField label="Height" unit="in"
                                    value={dimension?.height ?? ''} onChange={changeHandler('height')}/>
                    <FormText className="text-secondary">{dimensionNotes?.height ?? null}</FormText>
                </Col>
            </FormGroup>
            <FormGroup as={Row} className="g-3 mb-1">
                {showQuantity && (
                    <Col xs={12} sm={6}>
                        <DimensionField label="Quantity" unit="#"
                                        value={dimension?.quantity ?? ''} onChange={changeHandler('quantity')}/>
                        <FormText className="text-secondary">{dimensionNotes?.quantity ?? null}</FormText>
                    </Col>
                )}
                {showVolume && (
                    <Col xs={12} sm={6}>
                        <DimensionField label="Volume" unit="cu in" readOnly
                                        value={numeral(volume.toString()).format('0,0.00')}/>
                        <FormText className="text-secondary">{dimensionNotes?.volume ?? null}</FormText>
                    </Col>
                )}
                {showWeight && (
                    <Col xs={12} sm={6}>
                        <DimensionField label="Weight" unit="lb"
                                        value={dimension?.weight ?? ''} onChange={changeHandler('weight')}/>
                        <FormText className="text-secondary">{dimensionNotes?.weight ?? null}</FormText>
                    </Col>
                )}
                {showFloatCapacity && (
                    <Col xs={12} sm={6}>
                        <DimensionField label="Floats" unit="g"
                                        value={dimension?.floatCapacity ?? ''}
                                        onChange={changeHandler('floatCapacity')}/>
                        <FormText className="text-secondary">{dimensionNotes?.floatCapacity ?? null}</FormText>
                    </Col>
                )}
            </FormGroup>
        </div>
    )
}
