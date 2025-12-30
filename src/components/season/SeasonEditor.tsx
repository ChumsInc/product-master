import type {ProductSeason} from "chums-types";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectCurrentSeason, selectSeasonsStatus} from "@/ducks/settings/seasonsSlice.ts";
import {type ChangeEvent, type FormEvent, useState} from "react";
import {Button, Col, Form, ProgressBar, Row} from "react-bootstrap";
import TextArea from "@chumsinc/textarea";
import ColorBadge from "@/components/season/ColorBadge.tsx";
import {saveSeason} from "@/ducks/settings/actions.ts";

const newSeason: ProductSeason = {
    id: 0,
    code: '',
    active: true,
    description: '',
    dateCreated: '',
    dateUpdated: '',
    notes: '',
    userId: 0,
    properties: {
        color: 'black'
    }
}
export default function SeasonEditor() {
    const current = useAppSelector(selectCurrentSeason);
    return (
        <SeasonForm current={current} key={current?.id}/>
    )
}

interface SeasonFormProps {
    current: ProductSeason | null
}

function SeasonForm({current}: SeasonFormProps) {
    const dispatch = useAppDispatch();
    const [season, setSeason] = useState<ProductSeason>(current ?? newSeason);
    const status = useAppSelector(selectSeasonsStatus);

    const changeHandler = (field: keyof ProductSeason) =>
        (ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
            switch (field) {
                case 'code':
                case 'description':
                case 'notes':
                    setSeason({...season, [field]: ev.target.value});
                    return;
            }
        }

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(saveSeason(season))
    }


    return (
        <Form onSubmit={submitHandler}>
            <h3>Season Editor</h3>
            {(status === 'loading' || status === 'saving') && <ProgressBar now={100} animated striped/>}
            <Form.Group as={Row}>
                <Form.Label column xs={2}>Code</Form.Label>
                <Col>
                    <Form.Control size="sm" value={season.code} onChange={changeHandler('code')}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column xs={2}>Description</Form.Label>
                <Col>
                    <Form.Control size="sm" value={season.description} onChange={changeHandler('description')}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column xs={2}>Notes</Form.Label>
                <Col>
                    <TextArea size="sm" minRows={3} maxRows={5} value={season.notes} onChange={changeHandler('notes')}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column xs={2}>Color</Form.Label>
                <Col>
                    <Form.Control type="color" className="w-100" value={season.properties.color}
                                  onChange={ev => setSeason({
                                      ...season,
                                      properties: {...season.properties, color: ev.target.value}
                                  })}/>
                </Col>
            </Form.Group>
            <Row className="g-3 justify-content-end mt-3">
                <Col xs={2}>Sample</Col>
                <Col xs="auto">
                    <ColorBadge color={season.properties.color} className="fs-5">{season.code}</ColorBadge>
                </Col>
                <Col></Col>
                <Col xs="auto">
                    <Button type="submit" size="sm" variant="primary" disabled={status !== 'idle'}>Save</Button>
                </Col>
                <Col xs="auto">
                    <Button type="button" size="sm" variant="outline-secondary" onClick={() => setSeason(newSeason)}>
                        New Season
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
