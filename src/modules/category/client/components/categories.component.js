import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Divider, Segment, Button, Modal, Header, TransitionablePortal, Grid, Card } from "semantic-ui-react";

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

    const cards = categories.map(function(category) {
        return (
            <Card key={category._id}>
                <Card.Content>
                    <Card.Header>{category.name}</Card.Header>
                    <Card.Meta>{category.items ? category.items.length : 0} Items</Card.Meta>
                    <Card.Description>
                        Steve wants to add you to the group <strong>best friends</strong>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Link to={`/items?categoryId=${category._id}`} className="ui button basic blue">
                        <Icon name="external alternate" color="teal"/> Show Items
                    </Link>
                    {loggedInUser && loggedInUser.isAdmin &&
                        <a onClick={() => setCategoryId(category._id)} className="ui button">
                            <Icon name="pencil" color="teal"/> Edit
                        </a>
                    }
                </Card.Content>
            </Card>
        );
    });

    return (
        <>
            { categories.length > 0 &&
                <>
                    {loggedInUser && loggedInUser.isAdmin &&
                        <Button floated="right" primary size="small" onClick={() => setCategoryId(null)}>
                            Add new category
                        </Button>
                    }

                    <Divider hidden clearing/>

                    <Card.Group itemsPerRow={4} stackable>
                        {cards}
                    </Card.Group>

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
