import React from 'react';

import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer/Footer';

export default class Layout extends React.Component {
    render() {
        const style = {
            marginTop: '10px',
            marginBottom: '10px'
        };

        return (
            <div>
                <Navigation/>
                <div class="container" style={style}>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}
