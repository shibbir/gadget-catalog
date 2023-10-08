import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormattedDate, FormattedNumber } from "react-intl";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Label, Message, Icon, Divider, Grid, Image, Item, Button, Header, Card, Breadcrumb, Modal, TransitionablePortal } from "semantic-ui-react";

import Types from "../item.types";
import ItemForm from "./item-form.component";
import { getItem, deleteItem, setAsActiveImage, deleteImage } from "../item.actions";

export default function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const item = useSelector(state => state.itemReducer.item);
    const user = useSelector(state => state.userReducer.loggedInUser);

    const [itemFormVisibleState, setItemFormVisibleState] = useState(false);

    useEffect(() => {
        dispatch(getItem(id));
    }, [dispatch]);

    const onDeleteItem = id => {
        if(confirm("Are you sure? All images associated with this item will be removed too.")) {
            dispatch(deleteItem(id)).then(function(result) {
                const { type } = result.action;

                if(type === Types.DELETE_ITEM_FULFILLED) {
                    navigate("/items");
                }
            });
        }
    };

    const onDeleteImage = (itemId, fileId) => {
        if(confirm("Are you sure you want to delete this image?")) {
            dispatch(deleteImage(itemId, fileId));
        }
    };

    if(!item) {
        return (
            <Message icon warning>
                <Icon name="warning sign" size="large"/>
                <Message.Content>
                    <Message.Header>Warning!</Message.Header>
                    Item not found.
                </Message.Content>
            </Message>
        );
    }

    if(item.files?.length) {
        item.activeImage = item.files.find(x => x.active === true);
    }

    return (
        <>
            <Breadcrumb size="small">
                <Link to="/items">
                    <Breadcrumb.Section>Items</Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon="right arrow"/>
                <Link to={`/items?categoryId=${item.category._id}`}>
                    <Breadcrumb.Section>{item.category.name}</Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon="right arrow"/>
                <Breadcrumb.Section active>{item.name}</Breadcrumb.Section>
            </Breadcrumb>

            <Divider hidden/>

            <Grid>
                <Grid.Column width={10}>
                    { item.activeImage &&
                        <Image src={item.activeImage.secure_url} alt={item.name}/>
                    }

                    { item.files && item.files.length === 0 &&
                        <Message warning icon>
                        <Icon name="warning sign" size="large"/>
                            <Message.Content>
                                <Message.Header>Warning!</Message.Header>
                                No images are found for this item. <Link to={`/items/${item._id}/edit`}>Consider editing the item</Link>.
                            </Message.Content>
                        </Message>
                    }
                </Grid.Column>

                <Grid.Column width={6}>
                    <Item>
                        <Item.Content>
                            <Header as="h3">{item.name}</Header>
                            <Divider hidden/>

                            <Divider horizontal>Meta Informations</Divider>

                            <Item.Meta>
                                <div>Category: <Link to={`/items?categoryId=${item.category._id}`}>{item.category.name}</Link></div>
                                <div>Brand: <Link to={`/items?brandId=${item.brand._id}`}>{item.brand.name}</Link></div>
                                { item.price &&
                                    <div>Price: <FormattedNumber value={item.price} style="currency" currency={item.currency}/></div>
                                }
                                <div>Purchase Date: <FormattedDate value={item.purchaseDate} day="2-digit" month="long" year="numeric"/></div>
                                { item.invoice &&
                                    <a href={`https://res.cloudinary.com/shibbir/image/upload/fl_attachment:invoice-${item._id}/${item.invoice.public_id}`}>Download invoice</a>
                                }
                            </Item.Meta>

                            <Divider horizontal>Specifications</Divider>

                            <Item.Description>
                                { item.description &&
                                    <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                                }
                                { !item.description &&
                                    <div>Not available at the moment.</div>
                                }
                            </Item.Description>
                        </Item.Content>
                    </Item>

                    { user && !user.isAdmin &&
                        <>
                            <Divider section/>

                            <Button color="blue" onClick={() => setItemFormVisibleState(true)}>
                                <Icon name="pencil"/> Edit
                            </Button>

                            <Button color="red" onClick={() => onDeleteItem(id)}>
                                <Icon name="trash"/> Delete
                            </Button>
                        </>
                    }
                </Grid.Column>
            </Grid>

            { item.files && item.files.length > 0 &&
                <div>
                    <Divider hidden/>
                    <h2>Manage images</h2>
                    <Divider section/>

                    <Card.Group>
                        { item.files.map((file) => {
                            return (
                                <Card key={file._id} raised>
                                    { file.active &&
                                        <Label color="teal" corner="right" size="small">
                                            <Icon name="pin"/>
                                        </Label>
                                    }

                                    <Card.Content className="ui center aligned">
                                        <Image src={file.secure_url} size="small"/>
                                    </Card.Content>

                                    { user && !user.isAdmin &&
                                        <Card.Content extra>
                                            <a onClick={() => dispatch(setAsActiveImage(item._id, file._id))} disabled={file.active}>
                                                <Icon color="teal" name="checkmark"/>
                                                Set as active
                                            </a>

                                            <div className="right floated">
                                                <a onClick={() => onDeleteImage(item._id, file._id)}>
                                                    <Icon color="red" name="delete"/>
                                                    Discard
                                                </a>
                                            </div>
                                        </Card.Content>
                                    }
                                </Card>
                            );
                        })}
                    </Card.Group>
                </div>
            }

            <TransitionablePortal open={itemFormVisibleState} transition={{ animation: "scale", duration: 400 }}>
                <Modal dimmer size="small" open={true}>
                    <Modal.Header>Item Form</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <ItemForm id={id}/>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={() => setItemFormVisibleState(false)}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </TransitionablePortal>
        </>
    );
}
