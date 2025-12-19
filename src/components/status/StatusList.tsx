import type {ProductStatusAttributes} from "chums-types";
import {Badge} from "react-bootstrap";
import {badgeStyles} from "@/components/status/badgeStyles.ts";

export interface StatusListProps {
    status: ProductStatusAttributes;
}
export default function StatusList({status}:StatusListProps) {
    return (
        <div style={{display: "inline"}}>
            {status.new && <Badge bg={badgeStyles.new} className="text-dark ms-1">N</Badge>}
            {status.updating && <Badge bg={badgeStyles.updating} className="text-dark ms-1">U</Badge>}
            {status.approved && <Badge bg={badgeStyles.approved} className="text-light ms-1">A</Badge>}
            {status.live && <Badge bg={badgeStyles.live} className="text-light ms-1">L</Badge>}
            {status.discontinued && <Badge bg={badgeStyles.discontinued} className="text-light ms-1">D</Badge>}
        </div>
    )
}
