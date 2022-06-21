import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {COMPANIES} from "../constants/defaults";
import classNames from "classnames";
import onClickOutside from "react-onclickoutside";
import DropDownItem from "./DropDownItem";


class CompanySelect extends Component {
    static propTypes = {
        company: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
    };

    state = {
        expanded: false
    };

    constructor(props) {
        super(props);
        this.onClickDropDown = this.onClickDropDown.bind(this);
        this.onSelectCompany = this.onSelectCompany.bind(this);
    }


    onClickDropDown() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    handleClickOutside() {
        this.setState({expanded: false});
    }

    onSelectCompany(val) {
        if (COMPANIES[val] === undefined) {
            return;
        }
        this.props.onSelect(val);
        this.setState({expanded: false});
    }


    render() {
        const {company} = this.props;
        const {expanded} = this.state;
        return (
            <li className={classNames("nav-item dropdown", {show: expanded})}>
                <a className="nav-link dropdown-toggle" role="button" aria-haspopup={true}
                   onClick={this.onClickDropDown}
                   aria-expanded={expanded}>{COMPANIES[company]}</a>
                <div className={classNames("dropdown-menu", {show: expanded})}>
                    <DropDownItem value={'chums'} label={COMPANIES.chums} onClick={this.onSelectCompany}/>
                    <DropDownItem value={'bc'} label={COMPANIES.bc} onClick={this.onSelectCompany}/>
                </div>
            </li>
        )
    }
}

export default onClickOutside(CompanySelect);
