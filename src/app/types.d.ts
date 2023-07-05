import {Tab} from "chums-components";
import {To} from "react-router-dom";

export interface NavTab extends Tab {
    to: To,
}
