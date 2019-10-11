import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Dropdown, Container, Icon } from "semantic-ui-react";

class Navbar extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <Menu stackable borderless>
                <Container>
                    <Menu.Item header>
                        <img src="images/logo.png"/>
                        Gadget Catalog
                    </Menu.Item>
                    <NavLink to="/" activeClassName="active" className="item">
                        <Icon name="dashboard"/>
                        Dashboard
                    </NavLink>
                    <Dropdown item text="Item">
                        <Dropdown.Menu>
                            <NavLink to="/items" activeClassName="active" className="item">
                                <Icon name="unordered list"/> Item list
                            </NavLink>
                            { user && !user.isAdmin &&
                                <NavLink to="/items/add" activeClassName="active" className="item">
                                    <Icon name="add"/> Add new item
                                </NavLink>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text="Category">
                        <Dropdown.Menu>
                            <NavLink to="/categories" activeClassName="active" className="item">
                                <Icon name="unordered list"/> Category list
                            </NavLink>
                            { user && user.isAdmin &&
                                <NavLink to="/categories/add" activeClassName="active" className="item">
                                    <Icon name="add"/> Add new category
                                </NavLink>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text="Brand">
                        <Dropdown.Menu>
                            <NavLink to="/brands" activeClassName="active" className="item">
                                <Icon name="unordered list"/> Brand list
                            </NavLink>
                            <NavLink to="/brands/add" activeClassName="active" className="item">
                                <Icon name="add"/> Add new brand
                            </NavLink>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Menu position="right">
                        <Dropdown item text={user.name}>
                            <Dropdown.Menu>
                                <NavLink to="/profile" activeClassName="active" className="item">
                                    <Icon name="edit"/> Edit profile
                                </NavLink>
                                <a href="/api/logout" className="item">
                                    <Icon name="sign out"/> Sign out
                                </a>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Container>
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    };
};

export default withRouter(connect(mapStateToProps)(Navbar));
