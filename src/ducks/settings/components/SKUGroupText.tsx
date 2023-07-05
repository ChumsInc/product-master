import React from 'react';
import {useSelector} from 'react-redux';
import {selectSKUGroups} from "../selectors";

export interface SKUGroupTextProps {
    id?: number,
}

const SkuGroupText = ({id}: SKUGroupTextProps) => {
    const list = useSelector(selectSKUGroups);
    const [skuGroup] = list.filter(g => g.id === id);
    return (
        <span title={skuGroup?.description}>
                {skuGroup?.code}
            </span>
    );
}

export default SkuGroupText;
