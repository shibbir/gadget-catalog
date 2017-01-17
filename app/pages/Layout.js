import React from 'react';
import { hashHistory } from 'react-router';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import AuthStore from '../stores/AuthStore';

export default class Layout extends React.Component {
    componentWillMount() {
        AuthStore.on('loggedOut', function() {
            hashHistory.push('/');
        });
    }

    render() {
        const style = {
            marginTop: '10px',
            marginBottom: '10px'
        };

        return (
            <div>
                <Navbar/>
                <div class="container" style={style}>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}
