import React from "react";
import { Container, Icon, Header, Divider, Segment, Button } from "semantic-ui-react";

export default function NoMatch() {
    return (
        <Container>
            <Divider hidden/>
            <Segment placeholder>
                <Header icon>
                    <Icon name="search" color="red"/>
                    The page you are looking for might have been removed had its name changed or is temporarily unavailable.
                </Header>
                <Segment.Inline>
                    <Button primary href="/">GO HOME</Button>
                </Segment.Inline>
            </Segment>
        </Container>
    );
}
