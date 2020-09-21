import React from "react";
import { Divider, Grid, Segment } from "semantic-ui-react";
import ManageOauth from "./ManageOauth";
import ChangePassword from "./ChangePassword";

export default function Profile() {
    return (
        <Segment>
            <Grid columns={2} relaxed="very" stackable>
                <Grid.Column>
                    <ChangePassword/>
                </Grid.Column>

                <Grid.Column>
                    <ManageOauth/>
                </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>
        </Segment>
    );
}
