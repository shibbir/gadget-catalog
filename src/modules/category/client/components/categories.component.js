import { Link } from "react-router-dom";
import { FormattedDate } from "react-intl";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Divider, Segment, Button, Table, Modal, Header, TransitionablePortal } from "semantic-ui-react";

import CategoryForm from "./category-form.component";
import { getCategories } from "../category.actions";

export default function Categories() {
    const dispatch = useDispatch();
    const [categoryId, setCategoryId] = useState(undefined);

    useEffect(() => {
        dispatch(getCategories());
    }, []);

    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
    const categories = useSelector(state => state.categoryReducer.categories);

    const rows = categories.map(function(category, index) {
        return (
            <Table.Row key={category._id}>
                <Table.Cell>{index+1}</Table.Cell>
                <Table.Cell>{category.name}</Table.Cell>
                <Table.Cell>{category.description}</Table.Cell>
                <Table.Cell><FormattedDate value={category.date} day="2-digit" month="long" year="numeric"/></Table.Cell>
                <Table.Cell>
                    <Link to={`/items?categoryId=${category._id}`}>
                        <Icon color="teal" name="external alternate"/>
                        {`${category.items.length} item(s)`}
                    </Link>
                </Table.Cell>
                <Table.Cell>
                    {loggedInUser && loggedInUser._id && loggedInUser._id === category.createdBy &&
                        <a onClick={() => setCategoryId(category._id)}>
                            <Icon name="edit" color="teal"/>
                        </a>
                    }
                    {loggedInUser && loggedInUser._id && loggedInUser._id !== category.createdBy &&
                        <Icon name="lock" color="black"/>
                    }
                </Table.Cell>
            </Table.Row>
        );
    });

    return (
        <>
            { categories.length > 0 &&
                <>
                    <Button floated="right" primary size="small" onClick={() => setCategoryId(null)}>
                        Add new category
                    </Button>

                    <Divider hidden clearing/>

                    <Table celled selectable compact>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                                <Table.HeaderCell>Last Updated</Table.HeaderCell>
                                <Table.HeaderCell>Items</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {rows}
                        </Table.Body>
                    </Table>

                    <TransitionablePortal open={categoryId !== undefined} transition={{ animation: "scale", duration: 400 }}>
                        <Modal dimmer size="tiny" open={true}>
                            <Modal.Header>Category Form</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <CategoryForm id={categoryId}/>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="black" onClick={() => setCategoryId(undefined)}>
                                    Close
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </TransitionablePortal>
                </>
            }

            { categories.length === 0 &&
                <Segment placeholder raised>
                    <Header icon>
                        <Icon name="warning sign"/>
                        No categories are available!
                    </Header>
                </Segment>
            }
        </>
    );
}
