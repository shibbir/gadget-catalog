import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Segment, Icon, Divider, Header, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getBrands } from "./brand.actions";

export default function Brands() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands());
    }, []);

    const user = useSelector(state => state.userReducer.user);
    const brands = useSelector(state => state.brandReducer.brands);

    let cards = brands.map(function(brand) {
        return (
            <Table.Row key={brand._id}>
                <Table.Cell>{brand.name}</Table.Cell>
                { user && user.isAdmin &&
                    <Table.Cell>{brand.createdBy}</Table.Cell>
                }
                <Table.Cell>
                    <Link to={`/items?brandId=${brand._id}`}>View</Link> | <Link to={`/brands/${brand._id}/edit`}>Edit</Link>
                </Table.Cell>
            </Table.Row>
        );
    });

    return (
        <>
            <h2>Available brands</h2>
            <Divider section/>

            { cards.length > 0 &&
                <Table celled compact striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            { user && user.isAdmin &&
                                <Table.HeaderCell>Created By</Table.HeaderCell>
                            }
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {cards}
                    </Table.Body>
                </Table>
            }

            { cards.length === 0 &&
                <Segment placeholder raised>
                    <Header icon>
                        <Icon name="warning sign"/>
                        You don't have any brands added yet!
                    </Header>
                    <Button primary>
                        <Link to="/brands/add" style={{color: "white"}}>Add New Brand</Link>
                    </Button>
                </Segment>
            }
        </>
    );
}
