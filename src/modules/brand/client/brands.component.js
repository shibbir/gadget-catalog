import { Link } from "react-router-dom";
import { FormattedDate } from "react-intl";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Segment, Icon, Header, Button, Modal, TransitionablePortal, Divider } from "semantic-ui-react";
import { getBrands } from "./brand.actions";
import BrandForm from "./brand-form.component";

export default function Brands() {
    const dispatch = useDispatch();
    const [brandId, setBrandId] = useState(undefined);

    useEffect(() => {
        dispatch(getBrands());
    }, []);

    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
    const brands = useSelector(state => state.brandReducer.brands);

    const rows = brands.map(function(brand, index) {
        return (
            <Table.Row key={brand._id}>
                <Table.Cell>{index+1}</Table.Cell>
                <Table.Cell>{brand.name}</Table.Cell>
                <Table.Cell><FormattedDate value={brand.date} day="2-digit" month="long" year="numeric"/></Table.Cell>
                <Table.Cell>
                    <Link to={`/items?brandId=${brand._id}`}>
                        <Icon color='teal' name="external alternate"/>
                        {brand.items ? brand.items.length : 0} item(s)
                    </Link>
                </Table.Cell>
                <Table.Cell>
                    {loggedInUser && loggedInUser._id && loggedInUser._id === brand.createdBy &&
                        <a onClick={() => setBrandId(brand._id)}>
                            <Icon name="edit" color="teal"/>
                        </a>
                    }
                    {loggedInUser && loggedInUser._id && loggedInUser._id !== brand.createdBy &&
                        <Icon name="lock" color="black"/>
                    }
                </Table.Cell>
            </Table.Row>
        );
    });

    return (
        <>
            { brands.length > 0 &&
                <>
                    <Button floated="right" primary size="small" onClick={() => setBrandId(null)}>
                        Add new brand
                    </Button>

                    <Divider hidden clearing/>

                    <Table selectable compact>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Last Updated</Table.HeaderCell>
                                <Table.HeaderCell>Items</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {rows}
                        </Table.Body>
                    </Table>

                    <TransitionablePortal open={brandId !== undefined} transition={{ animation: "scale", duration: 400 }}>
                        <Modal dimmer size="tiny" open={true}>
                            <Modal.Header>Brand Form</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <BrandForm id={brandId}/>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="black" onClick={() => setBrandId(undefined)}>
                                    Close
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </TransitionablePortal>
                </>
            }

            { brands.length === 0 &&
                <Segment placeholder raised>
                    <Header icon>
                        <Icon name="warning sign"/>
                        No brands are available!
                    </Header>
                </Segment>
            }
        </>
    );
}
