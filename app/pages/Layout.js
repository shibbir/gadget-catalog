import React from 'react';

import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer/Footer';

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <Navigation/>
                <div class="container"></div>
                <Footer/>
            </div>
        );
    }
}
