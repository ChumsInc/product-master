import SeasonList from "@/components/season/SeasonList.tsx";
import {Col, Row} from "react-bootstrap";
import type {ProductSeason} from "chums-types";
import {useAppDispatch} from "@/app/configureStore.ts";
import {setCurrentSeason} from "@/ducks/settings/seasonsSlice.ts";
import SeasonEditor from "@/components/season/SeasonEditor.tsx";

export default function SeasonsContainer() {
    const dispatch = useAppDispatch();
    const onSelectSeason = (season: ProductSeason) => {
        dispatch(setCurrentSeason(season));
    }
    return (
        <div className="container">
            <h3>Seasons Editor</h3>
            <Row className="g-3">
                <Col xs={4} md={2}>
                    <SeasonList onSelect={onSelectSeason}/>
                </Col>
                <Col>
                    <SeasonEditor/>
                </Col>
            </Row>
        </div>
    )
}
