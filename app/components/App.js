import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import NavbarContainer from '../containers/NavbarContainer';

export default class App extends React.Component {
    componentWillMount() {
        this.props.loadMeFromToken();
    }

    render() {
        const style = {
            marginTop: '10px',
            marginBottom: '10px'
        };

        return (
            <div>
                <NavbarContainer>
                    <Navbar/>
                </NavbarContainer>
                <div class="container" style={style}>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}
