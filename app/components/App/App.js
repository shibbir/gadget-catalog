import React from 'react';
import { Container } from 'semantic-ui-react';

import Footer from '../../components/Footer';
import NavbarContainer from '../../containers/NavbarContainer';

require('./app.css');

export default class App extends React.Component {
    constructor(props) {
        super();
        props.loadMeFromToken();
    }

    render() {
        return (
            <div>
                { this.props.isLoggedIn &&
                    <NavbarContainer/>
                }
                <Container>
                    {this.props.children}
                </Container>
                <Footer/>
            </div>
        );
    }
}
