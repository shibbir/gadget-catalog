import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Menu, Dropdown, Container } from 'semantic-ui-react';

export default class Navbar extends React.Component {
    logout() {
        this.props.logout();
    }

    render() {
        const navBarStyle = {
            marginBottom: '10px'
        };

        return (
            <Container style={navBarStyle}>
                <Menu stackable>
                    <Menu.Item header>Gadget Catalog</Menu.Item>
                    <Link to="dashboard" activeClassName="active" class="item">Dashboard</Link>
                    <Dropdown item text='Item'>
                        <Dropdown.Menu>
                            <Link to="items" activeClassName="active" class="item">Item list</Link>
                            <Link to="items/add" activeClassName="active" class="item">Add item</Link>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Link to="categories" activeClassName="active" class="item">Categories</Link>
                    <Menu.Menu position='right'>
                        <a href="javascript:void(0)" class="item" onClick={this.logout.bind(this)}>Sign out</a>
                    </Menu.Menu>
                </Menu>
            </Container>
        );
    }
}
