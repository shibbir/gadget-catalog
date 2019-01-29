import React from 'react';
import { Link } from 'react-router';
import { Table, Message, Icon } from 'semantic-ui-react';

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
                        <Link to={`items?filter_by=brand&filter_id=${brand._id}`}>View</Link> | <Link to={`/brands/${brand._id}/edit`}>Edit</Link>
                    </Table.Cell>
                </Table.Row>
            );
        });

        return (
            <div id="category-cards-container">
                { cards.length > 0 &&
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
                }

                { cards.length === 0 &&
                    <Message warning>
                        <Message.Header>
                            <Icon name="warning sign" size="large"/>
                            Nothing found!
                        </Message.Header>
                        To add a brand please <Link to="brands/add">click here</Link>.
                    </Message>
                }
            </div>
        );
    }
}
