import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {ProductSeason} from "chums-types";
import {selectSeasons} from "./selectors";
import {defaultSeason} from "./actionTypes";
import {v4 as uuid} from 'uuid';
import SeasonButton from "../../components/SeasonButton";
import CustomColorButton from "../../components/CustomColorButton";

export interface SeasonSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    id: string,
    seasonId: number,
    onlyActive?: boolean,
    defaultLabel?: string,
    defaultSeasonCode?: string,
    onChange: (season: ProductSeason | null) => void,
}

const SeasonDropDown = ({id, seasonId, onlyActive, defaultLabel, defaultSeasonCode, onChange, ...rest}: SeasonSelectorProps) => {
    const seasons = useSelector(selectSeasons);

    const [showDropDown, setShowDropDown] = useState(false);
    const [season, setSeason] = useState<ProductSeason | null>(null)

    const clickListener = (ev: MouseEvent) => {
        if (ev.target && !(ev.target as HTMLElement)?.closest(`#${id}`)) {
            setShowDropDown(false);
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickListener);
        return () => {
            window.removeEventListener('click', clickListener)
        }
    }, [])

    useEffect(() => {
        const [s] = seasons.filter(s => s.id === seasonId);
        setSeason(s || null);
    }, [seasonId, seasons])

    const onSelectSeason = (id: number) => {
        setShowDropDown(false);
        const [season] = seasons.filter(s => s.id === id);
        onChange(season || null);
    }

    const toggleDropDownHandler = () => {
        console.log(showDropDown, !showDropDown);
        setShowDropDown(!showDropDown)
    }

    return (
        <div className="dropdown" id={id} {...rest}>
            <CustomColorButton hexColor={season?.properties.color} className="btn btn-sm dropdown-toggle"
                               onClick={toggleDropDownHandler}>
                {season?.code || defaultLabel || '-'}
            </CustomColorButton>
            <div className={classNames("dropdown-menu p-1 mt-1", {show: showDropDown})}>
                <div className="d-flex flex-column">
                    <SeasonButton className="mb-1" onClick={() => onSelectSeason(0)}
                                  season={{...defaultSeason, code: defaultSeasonCode || '-'}} selected={!season?.id}/>
                    {seasons.map(s => (
                        <SeasonButton key={s.id} season={s}
                                      className="mb-1"
                                      onClick={() => onSelectSeason(s.id)}
                                      selected={s.id === season?.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SeasonDropDown;
