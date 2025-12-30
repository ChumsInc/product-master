import {Badge, type BadgeProps} from "react-bootstrap";
import {type ColorInput} from "@ctrl/tinycolor";
import {getSeasonStyle} from "@/components/season/utils.ts";

export interface ColorBadgeProps extends Omit<BadgeProps, 'bg' | 'color'> {
    color: ColorInput;
}

export default function ColorBadge({color, children, ...rest}: ColorBadgeProps) {
    return (
        <Badge bg="" style={getSeasonStyle(color)} {...rest}>
            {children}
        </Badge>
    )
}
