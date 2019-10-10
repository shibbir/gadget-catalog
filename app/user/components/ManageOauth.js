import React from "react";
import { connect } from "react-redux";
import { List, Divider } from "semantic-ui-react";
import { removeOauthProvider } from "../auth.actions";

class ManageOauth extends React.Component {
    render() {
        const { user, removeOauthProvider } = this.props;

        return (
            <div>
                <h3>Manage Oauth providers</h3>
                <Divider section/>

                <List divided relaxed>
                    <List.Item>
                        <List.Icon name="facebook" size="large" verticalAlign="middle" color="blue"/>
                        <List.Content>
                            <List.Header>Facebook</List.Header>
                            <List.Description>
                                { !user.facebook &&
                                    <a href="/oauth/facebook">[Connect]</a>
                                }
                                { user.facebook &&
                                    <div>
                                        {user.facebook.email} <a onClick={() => removeOauthProvider("facebook")}>[Disconnect]</a>
                                    </div>
                                }
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="google" size="large" verticalAlign="middle" color="red"/>
                        <List.Content>
                            <List.Header>Google</List.Header>
                        <List.Description>
                            { !user.google &&
                                <a href="/oauth/google">[Connect]</a>
                            }
                            { user.google &&
                                <div>
                                    {user.google.email} <a onClick={() => removeOauthProvider("google")}>[Disconnect]</a>
                                </div>
                            }
                        </List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeOauthProvider: (provider) => {
            if(confirm("Are you sure?")) {
                dispatch(removeOauthProvider(provider));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOauth);
