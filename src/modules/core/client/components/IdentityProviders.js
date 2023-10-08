import React from "react";
import { Button, Segment, Icon, Divider } from "semantic-ui-react";

export default function IdentityProviders() {
    return (
        <>
            <Divider hidden/>
            <Segment className="stacked center aligned">
                <Divider horizontal>or, use third party identity providers</Divider>
                <div>
                    <Button color="facebook" href="/auth/facebook">
                        <Icon name="facebook"/> Facebook
                    </Button>
                    <Button color="google plus" href="/auth/google">
                        <Icon name="google plus"/> Google
                    </Button>
                </div>
            </Segment>
        </>
    );
}
