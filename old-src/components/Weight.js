import React, {Fragment} from 'react';

const Weight = ({weight}) => {
    if (!weight || !Number(weight)) {
        return null;
    }
    return (<Fragment>{Number(weight).toFixed(4)}</Fragment>)
};

export default Weight;
