import React from 'react';

const TrimmedString = ({str = '', maxLen = 25}) => {
    if (!str) {
        return null;
    }
    return (
        <div title={str} className="pl--trimmed-15">
            {str}
        </div>
    )
};

export default TrimmedString;
