import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Card, Divider, Message, Icon, Menu, Container, Image, Dropdown } from 'semantic-ui-react';

export default class ItemList extends React.Component {
    constructor(props) {
        super();
        props.getBrands();
        props.getCategories();
        props.fetchItems(props.location.search);

        this.state = {
            params: queryString.parse(props.location.search)
        };

        this.filterBy = this.filterBy.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.search !== prevProps.location.search) {
            this.props.fetchItems(this.props.location.search);
        }
    }

    filterBy(event, data) {
        let newLocation = {
            pathname: 'items'
        };

        this.state = {
            params: queryString.parse(this.props.location.search)
        };

        if(data.value === '-1' && this.state.params.filter_by) {
            this.props.history.push(newLocation);
        } else if(data.value !== '-1' && this.state.params.filter_id !== data.value) {
            newLocation.search = queryString.stringify({
                filter_by: data.name,
                filter_id: data.value
            })

            this.props.history.push(newLocation);
        }
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
            activeImage = activeImage ? activeImage.url : null;

            return (
                <Card key={item._id} raised href={`#/items/${item._id}`}>
                    <Card.Content header={item.name} className="ui center aligned"/>
                    <Card.Content className="ui center aligned">
                        { activeImage
                            ? <Image src={activeImage} alt={item.name}/>
                            : 'Image Not Available!'
                        }
                    </Card.Content>
                </Card>
            );
        });

        let paginationLinks = [];

        for(let idx = 1; idx <= pagination.pages; idx++) {
            paginationLinks.push({
                idx,
                link: {
                    pathname: location.pathname,
                    search: queryString.stringify({ ...this.state.params, page: idx })
                },
                isActive: !this.state.params.page && idx === 1 || +this.state.params.page === idx
            });
        }

        paginationLinks = paginationLinks.map(function(page) {
            return (
                <Menu.Item active={page.isActive} key={page.idx}>
                    <Link to={page.link}>{page.idx}</Link>
                </Menu.Item>
            );
        });

        let defaultValue = this.state.params.filter_id || '-1';

        return (
            <div>
                Filter By Category:
                {' '}
                <Dropdown selection search name="category" onChange={this.filterBy} options={categoryOptions} defaultValue={defaultValue}/>
                {' '}
                Filter By Brand:
                {' '}
                <Dropdown selection search name="brand" onChange={this.filterBy} options={brandOptions} defaultValue={defaultValue}/>

                <Divider section/>

                { cards.length > 0 &&
                    <div id="item-cards-container">
                        <Card.Group itemsPerRow={4}>
                            {cards}
                        </Card.Group>

                        { pagination.pages !== 1 &&
                            <div>
                                <Divider hidden/>
                                <Container textAlign="center">
                                    <Menu pagination>
                                        {paginationLinks}
                                    </Menu>
                                </Container>
                            </div>
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
