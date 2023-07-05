import {NavLink, Outlet} from "react-router-dom";

const SettingsContainer = () => {
    return (
        <div>
            <h2>Settings</h2>
            <div className="row g-3">
                <div className="col-auto">
                    <div className="d-flex flex-column">
                        <NavLink to="/settings/seasons">Seasons</NavLink>
                        <NavLink to="/settings/colors">Colors</NavLink>
                        <NavLink to="/settings/mixes">Mixes</NavLink>
                        <NavLink to="/settings/sku-groups">SKU Groups</NavLink>
                        <NavLink to="/settings/categories">Product Categories</NavLink>
                    </div>
                </div>
                <div className="col">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SettingsContainer;
