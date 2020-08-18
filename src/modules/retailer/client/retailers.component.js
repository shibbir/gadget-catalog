import React, { useEffect, useState } from "react";
import { FormattedDate } from "react-intl";
import { Table, Icon, Button, Divider, TransitionablePortal, Modal } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { getRetailers } from "./retailer.actions";
import RetailerForm from "./retailer-form.component";

export default function Retailers() {
    const dispatch = useDispatch();
    const [retailerId, setRetailerId] = useState(undefined);

    useEffect(() => {
        dispatch(getRetailers());
    }, []);

    const retailers = useSelector(state => state.retailerReducer.retailers);

    const rows = retailers.map(function(retailer) {
        return (
            <Table.Row key={retailer._id}>
                <Table.Cell>{retailer.name}</Table.Cell>
                <Table.Cell><a href={`mailto:${retailer.email}`}>{retailer.email}</a></Table.Cell>
                <Table.Cell><a href={retailer.website}>{retailer.website}</a></Table.Cell>
                <Table.Cell>{retailer.address}</Table.Cell>
                <Table.Cell><FormattedDate value={retailer.updatedAt} day="2-digit" month="long" year="numeric"/></Table.Cell>
            </Table.Row>
        );
    });

    return (
        <>
            <Button floated="right" icon labelPosition="left" primary size="small" onClick={() => setRetailerId(null)}>
                <Icon name="user"/> Add new retailer
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
            </Table>

            <TransitionablePortal open={retailerId !== undefined} transition={{ animation: "scale", duration: 400 }}>
                <Modal dimmer size="tiny" open={true}>
                    <Modal.Header>Retailer Form</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <RetailerForm id={retailerId}/>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={() => setRetailerId(undefined)}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </TransitionablePortal>
        </>
    );
}
