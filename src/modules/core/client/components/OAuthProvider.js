import React from "react";
import { Button, Segment, Icon, Divider } from "semantic-ui-react";

export default function SocialAuthService() {
    return (
        <>
            <Divider hidden/>
            <Segment className="stacked center aligned">
                <Divider horizontal>or, use social service</Divider>
                <div>
                    <Button color="facebook" href="/oauth/facebook">
                        <Icon name="facebook"/> Facebook
                    </Button>
                    <Button color="google plus" href="/oauth/google">
                        <Icon name="google plus"/> Google
                    </Button>
                </div>
            </Segment>
        </>
    );
}
