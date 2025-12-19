import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import type {ErrorAlert} from "@chumsinc/alert-list";
import {AlertList, dismissAlert, selectAllAlerts} from "@chumsinc/alert-list";


export default function AppAlertList() {
    const dispatch = useAppDispatch();
    const alerts = useAppSelector(selectAllAlerts);

    const dismissHandler = (alert: ErrorAlert) => {
        dispatch(dismissAlert(alert));
    }
    return (
        <AlertList list={alerts} onDismiss={dismissHandler}/>
    )
}
