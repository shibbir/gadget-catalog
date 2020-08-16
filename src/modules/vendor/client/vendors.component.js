import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormattedDate } from "react-intl";
import { Table, Menu, Icon, Button, Divider, TransitionablePortal, Modal } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { getVendors } from "./vendor.actions";
import VendorForm from "./vendor-form.component";

export default function Categories() {
    const dispatch = useDispatch();
    const [vendorId, setVendorId] = useState(undefined);

    useEffect(() => {
        dispatch(getVendors());
    }, []);

    const vendors = useSelector(state => state.vendorReducer.vendors);

    const rows = vendors.map(function(vendor) {
        return (
            <Table.Row key={vendor._id}>
                <Table.Cell>{vendor.name}</Table.Cell>
                <Table.Cell><a href={`mailto:${vendor.email}`}>{vendor.email}</a></Table.Cell>
                <Table.Cell><a href={vendor.website}>{vendor.website}</a></Table.Cell>
                <Table.Cell>{vendor.address}</Table.Cell>
                <Table.Cell><FormattedDate value={vendor.updatedAt} day="2-digit" month="long" year="numeric"/></Table.Cell>
            </Table.Row>
        );
    });

    return (
        <>
            <Button floated="right" icon labelPosition="left" primary size="small" onClick={() => setVendorId(null)}>
                <Icon name="user"/> Add new vendor
            </Button>

            <Divider hidden clearing/>

            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>E-mail address</Table.HeaderCell>
                        <Table.HeaderCell>Website</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Last Updated</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rows}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='6'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>

            <TransitionablePortal open={vendorId !== undefined} transition={{ animation: "scale", duration: 400 }}>
                <Modal dimmer size="tiny" open={true}>
                    <Modal.Header>Vendor Form</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <VendorForm id={vendorId}/>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={() => setVendorId(undefined)}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </TransitionablePortal>
        </>
    );
}
