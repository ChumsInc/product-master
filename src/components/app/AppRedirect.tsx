import {Navigate} from "react-router";

export interface AppRedirectProps {
    to: string;
}
export default function AppRedirect({to}:AppRedirectProps) {
    return (
        <Navigate to={to}/>
    )
}
