import React from 'react';
import { Container } from 'semantic-ui-react';
import Footer from '../../components/Footer';
import MessageContainer from '../../containers/MessageContainer';
import NavbarContainer from '../../containers/NavbarContainer';

import 'semantic-ui-css/semantic.css';
import 'toastr/build/toastr.css';
import 'draft-js/dist/Draft.css';
import './app.css';

export default class App extends React.Component {
    constructor(props) {
        super();
        props.loadProfile();
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
                { this.props.isLoggedIn &&
                    <Footer/>
                }
                <MessageContainer/>
            </div>
        );
    }
}
