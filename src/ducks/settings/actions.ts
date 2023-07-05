import {ThunkAction} from "redux-thunk";
import {RootState} from "../../app/configureStore";
import {
    loadSettings,
    loadSettingsPending,
    loadSettingsRejected,
    loadSettingsResolved,
    SettingsAction
} from "./actionTypes";
import {selectSettingsLoading} from "./selectors";
import {fetchSettings} from "../../api/settings";

export interface SettingsThunkAction extends ThunkAction<any, RootState, unknown, SettingsAction> {
}

export const loadSettingsAction = (): SettingsThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectSettingsLoading(state)) {
                return;
            }
            dispatch({type: loadSettingsPending})
            const settings = await fetchSettings();
            dispatch({type: loadSettingsResolved, payload: {clearContext: loadSettings, ...settings}})
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("loadSettingsAction()", error.message);
                return dispatch({type: loadSettingsRejected, payload: {error, context: loadSettings}})
            }
            console.error("loadSettingsAction()", error);
        }
    }
