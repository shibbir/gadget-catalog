import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu, Container, Icon } from "semantic-ui-react";

export default function Navbar() {
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

    return (
        <Menu stackable borderless>
            <Container>
                <Menu.Item header style={{paddingLeft: 0}}>
                    <img src="/images/logo.png"/>
                </Menu.Item>
                <NavLink exact to="/" activeClassName="active" className="item">
                    <Icon name="dashboard" color="teal"/>
                    Dashboard
                </NavLink>
                <NavLink to="/items" activeClassName="active" className="item">
                    <Icon name="desktop" color="teal"/> Manage Items
                </NavLink>
                <NavLink to="/categories" activeClassName="active" className="item">
                    <Icon name="sitemap" color="teal"/> Manage Categories
                </NavLink>
                <NavLink to="/brands" activeClassName="active" className="item">
                    <Icon name="apple" color="teal"/> Manage Brands
                </NavLink>
                <NavLink to="/retailers" activeClassName="active" className="item">
                    <Icon name="amazon" color="teal"/> Manage Retailers
                </NavLink>
                <div className="right item" style={{paddingRight: 0}}>
                    <NavLink to="/profile" className="ui button teal"><Icon name="user"/> {loggedInUser.name}</NavLink>
                    <a href="/api/logout" className="ui button black" style={{marginLeft: '5px'}}><Icon name="sign out"/> Sign Out</a>
                </div>
            </Container>
        </Menu>
    );
}
