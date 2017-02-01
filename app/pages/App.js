import React from 'react';

import AppContainer from '../containers/AppContainer';

export default class Layout extends React.Component {
    render() {
        return (
            <AppContainer>
                {this.props.children}
            </AppContainer>
        );
    }
}
