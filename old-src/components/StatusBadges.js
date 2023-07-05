import React, {Fragment} from 'react';
import Badge from "../common-components/Badge";

const StatusBadges = ({status}) => {
    const {'new': _new, updating, approved, live, discontinued} = status;
    return (
        <Fragment>
            {_new && (<Badge type="warning">New</Badge>)}
            {updating && (<Badge type="info">Updating</Badge>)}
            {approved && (<Badge type="primary">Approved</Badge>)}
            {live && (<Badge type="success">Live</Badge>)}
            {discontinued && (<Badge type="danger">Disco'd</Badge>)}
        </Fragment>
    )
}

export default StatusBadges;
