import React from 'react';
import AppContainer from '../containers/AppContainer';

export default class Layout extends React.Component {
    render() {
        return (
            <AppContainer location={this.props.location}>
                {this.props.children}
            </AppContainer>
        );
    }
}
