import React from "react";
import { connect } from "react-redux";
import { List, Divider } from "semantic-ui-react";
import { removeOauthProvider } from "../auth.actions";

class ManageOauth extends React.Component {
    removeOauthProvider(provider) {
        if(confirm("Are you sure?")) {
            this.props.removeOauthProvider(provider);
        }
    }

    render() {
        const user = this.props.user;

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
                                { !user.facebook || !user.facebook.email &&
                                    <a href="/auth/facebook">[Connect]</a>
                                }
                                { user.facebook && user.facebook.email &&
                                    <div>
                                        {user.facebook.email} <a onClick={this.removeOauthProvider.bind(this, "facebook")}>[Disconnect]</a>
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
                            { !user.google || !user.google.email &&
                                <a href="/auth/google">[Connect]</a>
                            }
                            { user.google && user.google.email &&
                                <div>
                                    {user.google.email} <a onClick={this.removeOauthProvider.bind(this, "google")}>[Disconnect]</a>
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
        removeOauthProvider: (formData) => {
            dispatch(removeOauthProvider(formData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOauth);
