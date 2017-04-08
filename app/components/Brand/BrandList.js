import React from 'react';
import { Link } from 'react-router';
import { Icon, Button, Table } from 'semantic-ui-react';

export default class BrandList extends React.Component {
    constructor(props) {
        super();
        props.getBrands('?filter_by=user');
    }

    render() {
        const { brands } = this.props;

        let cards = brands.map(function(brand) {
            return (
                <Table.Row key={brand._id}>
                    <Table.Cell>{brand.name}</Table.Cell>
                    <Table.Cell>
                        <Button positive compact href={`#/brands/${brand._id}/edit`}>
                            <Icon name="edit"/> Edit
                        </Button>
                    </Table.Cell>
                </Table.Row>
            );
        });

        return (
            <div id="category-cards-container">
                <Table basic='very' celled collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {cards}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}
