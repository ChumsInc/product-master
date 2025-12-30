import {Container} from "react-bootstrap";
import AppAlertList from "@/components/app/AppAlertList.tsx";
import {Outlet} from "react-router";
import AppNavigation from "@/components/app/AppNavigation.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "@/app/configureStore.ts";
import {loadSettings} from "@/ducks/settings/actions.ts";

export default function AppContent() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadSettings())
    }, [dispatch])

    return (
        <Container fluid>
            <AppAlertList/>
            <AppNavigation/>
            <Outlet/>
        </Container>
    )
}
