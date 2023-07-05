import React from 'react';
import {ProductStatusAttributes} from "chums-types";
import {Badge} from "chums-components";

export interface StatusBadgeProps {
    status: ProductStatusAttributes,
}

const StatusBadges = ({status}: StatusBadgeProps) => {
    const {'new': _new, updating, approved, live, discontinued} = status;
    return (
        <>
            {_new && (<Badge color="warning">New</Badge>)}
            {updating && (<Badge color="info">Updating</Badge>)}
            {approved && (<Badge color="primary">Approved</Badge>)}
            {live && (<Badge color="success">Live</Badge>)}
            {discontinued && (<Badge color="danger">Disco'd</Badge>)}
        </>
    )
}

export default StatusBadges;
