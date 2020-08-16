import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu, Dropdown, Container, Icon } from "semantic-ui-react";

export default function Navbar() {
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

    return (
        <Menu stackable borderless>
            <Container>
                <Menu.Item header style={{paddingLeft: 0}}>
                    <img src="/images/logo.png"/>
                    Gadget Catalog
                </Menu.Item>
                <NavLink exact to="/" activeClassName="active" className="item">
                    <Icon name="dashboard"/>
                    Dashboard
                </NavLink>
                <Dropdown item text="Item">
                    <Dropdown.Menu>
                        <NavLink to="/items" activeClassName="active" className="item">
                            <Icon name="unordered list"/> Item list
                        </NavLink>
                        { !loggedInUser.isAdmin &&
                            <NavLink to="/items/add" activeClassName="active" className="item">
                                <Icon name="add"/> Add new item
                            </NavLink>
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <NavLink to="/categories" activeClassName="active" className="item">
                    <Icon name="unordered list"/> Categories
                </NavLink>
                <NavLink to="/brands" activeClassName="active" className="item">
                    <Icon name="unordered list"/> Brands
                </NavLink>
                <NavLink to="/vendors" activeClassName="active" className="item">
                    <Icon name="unordered list"/> Vendors
                </NavLink>
                <div className="right item" style={{paddingRight: 0}}>
                    <NavLink to="/profile" className="ui button teal"><Icon name="user"/> {loggedInUser.name}</NavLink>
                    <a href="/api/logout" className="ui button black"><Icon name="sign out"/> Sign Out</a>
                </div>
            </Container>
        </Menu>
    );
}
