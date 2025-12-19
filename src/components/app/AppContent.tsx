import {Container} from "react-bootstrap";
import AppAlertList from "@/components/app/AppAlertList.tsx";
import {Outlet, useMatch, useNavigate} from "react-router";
import AppNavigation, {tabProductList} from "@/components/app/AppNavigation.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "@/app/configureStore.ts";
import {loadSettings} from "@/ducks/settings/actions.ts";

export default function AppContent() {
    const dispatch = useAppDispatch();
    const match = useMatch('/:tab/:productId?');
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadSettings())
    }, [])

    const tabChangeHandler = (t: string | null) => {
        const tab = t ?? tabProductList;
        navigate(`/${tab}`);
    }
    return (
        <Container fluid>
            <AppAlertList/>
            <AppNavigation tab={match?.params.tab ?? tabProductList} onChangeTab={tabChangeHandler}/>
            <Outlet/>
        </Container>
    )
}
