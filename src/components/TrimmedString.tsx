import React from 'react';
import styled from 'styled-components';

const TrimmedSpan = styled.span`
    text-overflow: ellipsis,
`;

export interface TrimmedStringProps {
    str:string|null,
    maxLen?: number,
}
const TrimmedString = ({str, maxLen = 25}:TrimmedStringProps) => {
    if (!str) {
        return null;
    }
    return (
        <TrimmedSpan title={str} className="pl--trimmed-15" style={{maxWidth: `${maxLen}em`}}>
            {str}
        </TrimmedSpan>
    )
};

export default TrimmedString;
