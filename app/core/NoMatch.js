import React from 'react';
import { Container, Icon, Header, Divider } from 'semantic-ui-react';

import Footer from '../shared/components/Footer';

export default class NoMatch extends React.Component {
    render() {
        return (
            <>
                <Container>
                    <Divider hidden/>
                    <Header as='h1'>
                        <Icon name="frown outline" size="large" color="red"/>
                        404... Page not found.
                    </Header>
                </Container>
                <Footer/>
            </>
        );
    }
}
