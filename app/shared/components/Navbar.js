import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Container, Icon } from 'semantic-ui-react';

export default class Navbar extends React.Component {
    render() {
        const navBarStyle = {
            marginBottom: '10px'
        };

        const { user } = this.props;

        return (
            <Container style={navBarStyle}>
                <Menu stackable>
                    <Menu.Item header>Gadget Catalog</Menu.Item>
                    <NavLink to="/" activeClassName="active" className="item">
                        <Icon name="dashboard"/>
                        Dashboard
                    </NavLink>
                    <Dropdown item text='Item'>
                        <Dropdown.Menu>
                            <NavLink to="items" activeClassName="active" className="item">Item list</NavLink>
                            <NavLink to="items/add" activeClassName="active" className="item">Add new item</NavLink>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text='Category'>
                        <Dropdown.Menu>
                            <NavLink to="categories" activeClassName="active" className="item">Category list</NavLink>
                            { user && user.isAdmin &&
                                <NavLink to="categories/add" activeClassName="active" className="item">Add new category</NavLink>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text='Brand'>
                        <Dropdown.Menu>
                            <NavLink to="brands" activeClassName="active" className="item">Brand list</NavLink>
                            <NavLink to="brands/add" activeClassName="active" className="item">Add new brand</NavLink>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Menu position='right'>
                        <Dropdown item text={user.name}>
                            <Dropdown.Menu>
                                <NavLink to="profile" activeClassName="active" className="item">
                                    <Icon name="edit"/> Edit profile
                                </NavLink>
                                <a href="/api/logout" className="item">
                                    <Icon name="sign out"/> Sign out
                                </a>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
            </Container>
        );
    }
}
