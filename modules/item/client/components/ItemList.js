import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { Label, Form, Button, Card, Divider, Icon, Menu, Container, Image, Segment, Header } from "semantic-ui-react";

export default class ItemList extends React.Component {
    constructor(props) {
        super();
        props.getBrands();
        props.getCategories();
        props.fetchItems(props.location.search);

        this.state = {
            params: queryString.parse(props.location.search)
        };

        this.state = {
            ...this.state,
            brandName: "",
            categoryName: "",
            brandId: this.state.params.brandId || "-1",
            categoryId: this.state.params.categoryId || "-1"
        };

        this.filter = this.filter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
        this.discardFilter = this.discardFilter.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        const params = queryString.parse(this.props.location.search);

        if(this.props.categories
            && this.props.categories.length
            && params.categoryId
            && params.categoryId !== "-1") {
            this.state.categoryName = this.props.categories.find(x => x._id === params.categoryId).name;
        }

        if(this.props.brands
            && this.props.brands.length
            && params.brandId
            && params.brandId !== "-1") {
            this.state.brandName = this.props.brands.find(x => x._id === params.brandId).name;
        }

        if(this.props.location.search !== prevProps.location.search) {
            this.props.fetchItems(this.props.location.search);
        }
    }

    handleInputChange(event, data) {
        this.setState({
            [data.name]: data.value
        });
    }

    resetFilter() {
        this.state.brandId = "-1";
        this.state.categoryId = "-1";
        this.filter();
    }

    discardFilter(event) {
        this.state[event.target.dataset.id] = "-1";
        this.filter();
    }

    filter() {
        if(this.state.categoryId === "-1" && this.state.brandId === "-1") {
            this.props.history.push({ pathname: "items" });
            return;
        };

        let q = {};

        if(this.state.categoryId !== "-1") {
            q.categoryId = this.state.categoryId;
        }

        if(this.state.brandId !== "-1") {
            q.brandId = this.state.brandId;
        }

        if(this.props.location.search === `?${queryString.stringify(q)}`) return;

        this.props.history.push({
            pathname: "items",
            search: queryString.stringify(q)
        });
    }

    render() {
        const { categoryId, categoryName, brandId, brandName } = this.state;
        const params = queryString.parse(this.props.location.search);

        const {
            items: { data, pagination } = items,
            location, brands, categories
        } = this.props;

        let categoryOptions = categories.map(function(option) {
            return { key: option._id, value: option._id, text: option.name };
        });

        let brandOptions = brands.map(function(option) {
            return { key: option._id, value: option._id, text: option.name };
        });

        brandOptions.unshift({ key: "-1", value: "-1", text: "Select Brand" });
        categoryOptions.unshift({ key: "-1", value: "-1", text: "Select Category" });

        let cards = data.map(function(item) {
            let activeImage = item.files.filter(x => x.active)[0];
            activeImage = activeImage ? activeImage.secure_url : null;

            return (
                <Card key={item._id} raised href={`/items/${item._id}`}>
                    <Card.Content header={item.name} className="ui center aligned"/>
                    <Card.Content className="ui center aligned image-wrapper">
                        { activeImage
                            ? <Image src={activeImage} alt={item.name}/>
                            : "Image Not Available!"
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
                    search: queryString.stringify({ ...params, page: idx })
                },
                isActive: !params.page && idx === 1 || +params.page === idx
            });
        }

        paginationLinks = paginationLinks.map(function(page) {
            return (
                <Menu.Item active={page.isActive} key={page.idx}>
                    <Link to={page.link}>{page.idx}</Link>
                </Menu.Item>
            );
        });

        return (
            <>

                <Divider hidden/>

                { cards.length > 0 &&
                    <Segment raised className="stacked">
                        <Header as="h2">
                            <Icon name="archive" circular/>
                            <Header.Content>
                                Total Gadgets: {pagination.count}
                                <Header.Subheader>Filter your gadgets by category, brand and price <Icon name="angle double down"></Icon></Header.Subheader>
                            </Header.Content>
                        </Header>

                        <Form onSubmit={this.filter}>
                            <Form.Group inline>
                                <Form.Dropdown
                                    selection
                                    name="categoryId"
                                    options={categoryOptions}
                                    value={categoryId}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Dropdown
                                    selection
                                    name="brandId"
                                    options={brandOptions}
                                    value={brandId}
                                    onChange={this.handleInputChange}
                                />

                                <Button.Group>
                                    <Button type="submit" positive>
                                        <Icon name="filter"/> Filter
                                    </Button>
                                    <Button.Or />
                                    <Button type="button" onClick={this.resetFilter}>
                                        <Icon name="undo"/> Reset
                                    </Button>
                                </Button.Group>
                            </Form.Group>
                        </Form>
                    </Segment>
                }

                {(params.categoryId || params.brandId) &&
                    <div>
                        {(params.categoryId && params.categoryId !== "-1") &&
                            <Label color="blue">
                                Category: {categoryName} <Icon name="delete" data-id="categoryId" onClick={this.discardFilter}/>
                            </Label>
                        }

                        {(params.brandId && params.brandId !== "-1") &&
                            <Label color="blue">
                                Brand: {brandName} <Icon name="delete" data-id="brandId" onClick={this.discardFilter}/>
                            </Label>
                        }

                        <Divider hidden/>
                    </div>
                }

                { cards.length > 0 &&
                    <div id="item-cards-container">
                        <Card.Group itemsPerRow={5} stackable>
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
                    <Segment placeholder raised>
                        <Header icon>
                            <Icon name="warning sign" />
                            You don't have any items!
                        </Header>
                        <Button primary>
                            <Link to="/items/add" style={{color: "white"}}>Add New Item</Link>
                        </Button>
                    </Segment>
                }
            </>
        );
    }
}
