import type {ProductStatusAttributes} from "chums-types";
import {type BadgeProps} from "react-bootstrap";
import {badgeStyles, statusTitles} from "@/components/status/badgeStyles.ts";
import styled from "@emotion/styled";
import clsx from "clsx";


const StatusBadgeContainer = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`
const BadgeTitle = styled.div`
    flex: 1 1 100%;
    text-align: left;
`
const BadgeCheckContainer = styled.div`
    flex: 0 0 1rem;
    text-align: right;
`

export interface StatusBadgeProps extends BadgeProps {
    code: keyof ProductStatusAttributes | 'all' | 'none';
    showChecked?: boolean;
    checked?: boolean;
}

export default function StatusBadge({code, showChecked, checked}: StatusBadgeProps) {
    const variant = badgeStyles[code];
    const className = clsx('badge badge-pill', {
        [`text-bg-${variant}`]: true,
    })
    return (
        <StatusBadgeContainer className={className}>
            <BadgeTitle>{statusTitles[code]}</BadgeTitle>
            {showChecked && (
                <BadgeCheckContainer>
                    {checked && <span className="bi-check"/>}
                    {!checked && <span className=""/>}
                </BadgeCheckContainer>
            )}
        </StatusBadgeContainer>
    )
}
