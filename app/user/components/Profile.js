import React from "react";
import { Divider, Grid, Segment } from "semantic-ui-react";
import Password from "./Password";
import ManageOauth from "./ManageOauth";

export default class Profile extends React.Component {
    render() {
        return (
            <Segment>
                <Grid columns={2} relaxed="very" stackable>
                    <Grid.Column>
                        <Password/>
                    </Grid.Column>

                    <Grid.Column>
                        <ManageOauth/>
                    </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </Segment>
        );
    }
}
