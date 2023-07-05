import React, {Fragment} from 'react';

const Dimension = ({length, width, height} = {}) => {
    if (!length && !width && !height) {
        return null;
    }

    const dims = [length, width, height].filter(d => !!d).join(' x ');
    return (
        <Fragment>{dims}</Fragment>
    )
};

export default Dimension;
