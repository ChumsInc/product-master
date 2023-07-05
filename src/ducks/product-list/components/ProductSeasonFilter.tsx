import React from 'react';
import {useAppDispatch} from "../../../app/configureStore";
import {useSelector} from "react-redux";
import {selectProductListSeason} from "../selectors";
import {setListSeasonFilterAction} from "../index";
import SeasonDropDown from "../../seasons/SeasonDropDown";

const elementId = 'product-list-season-filter';

const ProductSeasonFilter = () => {
    const dispatch = useAppDispatch();
    const season = useSelector(selectProductListSeason);


    const onSelectSeason = (id?: number) => {
        dispatch(setListSeasonFilterAction(id || 0))
    }

    return (
        <SeasonDropDown id="product-list--season-filter" seasonId={season.id}
                        defaultLabel="Filter by Season" defaultSeasonCode="All Seasons"
                        onChange={(season) => onSelectSeason(season?.id)}/>
    )
}

export default ProductSeasonFilter;
