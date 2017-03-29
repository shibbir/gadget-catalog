import React from 'react';
import { Link, hashHistory } from 'react-router';
import { FormattedDate, FormattedNumber } from 'react-intl';
import { Card, Select, Form, Divider, Button, Label, Message, Icon, Menu, Container, Image } from 'semantic-ui-react';

export default class ItemList extends React.Component {
    constructor(props) {
        super();

        props.getBrands();
        props.getCategories();
        props.fetchItems(props.location.search);

        this.filterBy = this.filterBy.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.search !== nextProps.location.search) {
            this.props.fetchItems(nextProps.location.search);
        }
    }

    filterBy(event, data) {
        let newLocation = {
            pathname: 'items'
        };

        if(data.value && !+data.value) {
            newLocation.query = { ...this.props.location.query, filter_by: data.name, filter_id: data.value };
        }

        hashHistory.push(newLocation);
    }

    render() {
        const { items: { data, pagination } = items, location, brands, categories } = this.props;

        let categoryOptions = categories.map(function(option) {
            return { key: option._id, value: option._id, text: option.name };
        });

        let brandOptions = brands.map(function(option) {
            return { key: option._id, value: option._id, text: option.name };
        });

        brandOptions.unshift({ key: '-1', value: '-1', text: 'None' });
        categoryOptions.unshift({ key: '-1', value: '-1', text: 'None' });

        let cards = data.map(function(item) {
            let activeImage = item.files.filter(x => x.active)[0];
            activeImage = activeImage ? activeImage : item.files[0];
            activeImage = activeImage ? activeImage.url : item.noImageUrl;

            return (
                <Card key={item._id} raised>
                    <Card.Content header={item.name}/>
                    <Card.Content>
                        <Image src={activeImage} alt={item.name}/>
                    </Card.Content>
                    <Card.Content>
                        <Card.Description>
                            <div>Category: {item.category.name}</div>
                            <div>Brand: {item.brand.name}</div>
                            <div>Price: <FormattedNumber value={item.price} style="currency" currency="BDT"/></div>
                            <div>Date: <FormattedDate value={item.purchaseDate} day="numeric" month="long" year="numeric"/></div>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Link to={`items/${item._id}`} className="ui button teal">Details</Link>
                    </Card.Content>
                </Card>
            );
        });

        let paginationLinks = [];

        for(let idx = 1; idx <= pagination.pages; idx++) {
            paginationLinks.push({
                idx,
                link: { pathname: location.pathname, query: { ...location.query, page: idx }},
                isActive: !location.query.page && idx === 1 || +location.query.page === idx
            });
        }

        paginationLinks = paginationLinks.map(function(page) {
            return (
                <Menu.Item active={page.isActive} key={page.idx}>
                    <Link to={page.link}>{page.idx}</Link>
                </Menu.Item>
            );
        });

        let defaultValue = location.query.filter_id || '-1';

        return (
            <div>
                <Form>
                    <Form.Group>
                        <Form.Field>
                            <Label pointing="below" color="orange">Filter By Category</Label>
                            <Select search size="medium" name="category" onChange={this.filterBy} options={categoryOptions} defaultValue={defaultValue}/>
                        </Form.Field>

                        <Form.Field>
                            <Label pointing="below" color="orange">Filter By Brand</Label>
                            <Select search name="brand" onChange={this.filterBy} options={brandOptions} defaultValue={defaultValue}/>
                        </Form.Field>
                    </Form.Group>
                </Form>

                <Divider section/>

                { cards.length > 0 &&
                    <div id="item-cards-container">
                        <Card.Group>
                            {cards}
                        </Card.Group>

                        { pagination.pages !== 1 &&
                            <Container textAlign="center">
                                <Menu pagination>
                                    {paginationLinks}
                                </Menu>
                            </Container>
                        }
                    </div>
                }
                { cards.length === 0 &&
                    <Message warning>
                        <Message.Header>
                            <Icon name="warning sign" size="large"/>
                            Nothing found!
                        </Message.Header>
                        To add an item please <Link to="items/add">click here</Link>.
                    </Message>
                }
            </div>
        );
    }
}
