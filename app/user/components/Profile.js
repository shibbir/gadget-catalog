import React from "react";
import { connect } from "react-redux";
import { Divider, Grid, Segment } from "semantic-ui-react";
import Password from "./Password";
import ManageOauth from "./ManageOauth";
import { changePassword } from "../auth.actions";

class Profile extends React.Component {
    render() {
        return (
            <Segment>
                <Grid columns={2} relaxed="very" stackable>
                    <Grid.Column>
                        <Password changePassword={this.props.changePassword}/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (formData) => {
            dispatch(changePassword(formData));
        }
    };
};

export default connect(null, mapDispatchToProps)(Profile);
