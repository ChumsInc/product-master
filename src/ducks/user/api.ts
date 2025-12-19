import {fetchJSON} from "@chumsinc/ui-utils";
import type {ExtendedUserProfile} from "chums-types";

export async function fetchUserRoles(): Promise<string[]> {
    try {
        const url = '/api/user/profile.json';
        const res = await fetchJSON<{ user: ExtendedUserProfile }>(url, {cache: 'no-cache'});
        return res?.user?.roles?.map(role => role.role) ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchUserRoles()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchUserRoles()", err);
        return Promise.reject(new Error('Error in fetchUserRoles()'));
    }
}
