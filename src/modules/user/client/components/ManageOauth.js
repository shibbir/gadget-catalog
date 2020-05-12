import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Divider } from "semantic-ui-react";
import { removeOauthProvider } from "../user.actions";

export default function ManageOauth() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

    const onRemoveOauthProvider = provider => {
        if(confirm("Are you sure?")) {
            dispatch(removeOauthProvider(provider));
        }
    }

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
                            { !loggedInUser.facebook &&
                                <a href="/oauth/facebook">[Connect]</a>
                            }
                            { loggedInUser.facebook &&
                                <div>
                                    {loggedInUser.facebook.email} <a onClick={() => onRemoveOauthProvider("facebook")}>[Disconnect]</a>
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
                        { !loggedInUser.google &&
                            <a href="/oauth/google">[Connect]</a>
                        }
                        { loggedInUser.google &&
                            <div>
                                {loggedInUser.google.email} <a onClick={() => onRemoveOauthProvider("google")}>[Disconnect]</a>
                            </div>
                        }
                    </List.Description>
                    </List.Content>
                </List.Item>
            </List>
        </div>
    );
}
