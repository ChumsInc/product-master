import {ProductStatusAttributes} from "chums-types";
import {BootstrapButtonColor} from "chums-components";

export type StatusAttributes = {
    code: keyof ProductStatusAttributes,
    title: string,
    className: BootstrapButtonColor,
    hexColor?: string,
};

export const productStatusAttributes:StatusAttributes[] = [
    {code: 'new', title: 'New', className: 'warning'},
    {code: 'updating', title: 'Updating', className: 'info'},
    {code: 'approved', title: 'Approved', className: 'primary'},
    {code: 'live', title: 'Live', className: 'success'},
    {code: 'discontinued', title: "Disco'd", className: 'danger'},
]
