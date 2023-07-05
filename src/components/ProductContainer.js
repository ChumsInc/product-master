import React, {Component} from 'react';
import ProductMain from "./ProductMain";
import {getProduct, setProductSection} from "../actions/product";
import {setProductMainUI} from '../actions/app';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProductDimensions from "./ProductDimensions";
import classNames from 'classnames';
import {HashRouter as Router, Route, Redirect, NavLink, Switch} from 'react-router-dom';
import {PATH_PRODUCT} from "../constants/paths";
import SKUItemList from "./SKUItemList";
import NavPill from "../common-components/NavPill";
import {PRODUCT_SECTIONS} from "../constants/defaults";



const mapStateToProps = (state, ownProps) => {
    const {selected, section} = state.product;
    const {productMain} = state.ui
    return {selected, ui: productMain, section};
};

const mapDispatchToProps = {
    getProduct,
    setProductMainUI,
    setProductSection,
}

class ProductContainer extends Component {
    static propTypes = {
        selected: PropTypes.shape({
            id: PropTypes.number,
        }),
        ui: PropTypes.shape({
            tab: PropTypes.string,
        }),
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                section: PropTypes.string,
            })
        }),
        getProduct: PropTypes.func.isRequired,
        setProductMainUI: PropTypes.func.isRequired,
        setProductSection: PropTypes.func.isRequired,
    };

    static defaultProps = {
        selected: {
            id: 0,
        },
        ui: {
            tab: '',
        },
        match: {
            params: {
                id: 0,
                section: null,
            }
        }
    };

    constructor(props) {
        super(props);
        this.onClickNav = this.onClickNav.bind(this);
    }

    componentDidMount() {
        const {id, section} = this.props.match.params;

        // have to match id.toString() because match.params returns a string
        if (id && this.props.selected.id.toString() !== id) {
            this.props.getProduct(id);
        }
        if (!!section && this.props.section !== section) {
            this.props.setProductSection(section);
        }
    }

    onClickNav(ev) {
        ev.preventDefault();
        this.props.setProductMainUI({tab: ev.target.dataset?.tab});
    }

    render() {
        const {id} = this.props.match.params;
        const {section} = this.props;
        const dimensionsLink = `/product/:id/dimensions`.replace(':id', encodeURIComponent(id));
        const itemsLink = `/product/:id/items`.replace(':id', encodeURIComponent(id));
        return (
            <div className="row g-3 pm__product">
                <div className="col-sm-6 col-md-4 col-lg-3">
                    <ProductMain />
                </div>
                <div className="col">
                    <div className="row g-3">
                        <div className="col-auto">
                            <nav className="nav flex-column nav-pills">
                                <NavPill to={PRODUCT_SECTIONS.dimensions} active={section === PRODUCT_SECTIONS.dimensions}
                                         onClick={this.props.setProductSection}>Dimensions</NavPill>
                                <NavPill to={PRODUCT_SECTIONS.items} active={section === PRODUCT_SECTIONS.items}
                                         onClick={this.props.setProductSection}>Sage Items</NavPill>
                            </nav>
                        </div>
                        <div className="col">
                            {section === PRODUCT_SECTIONS.dimensions && <ProductDimensions />}
                            {section === PRODUCT_SECTIONS.items && <SKUItemList />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
