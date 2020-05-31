import queryString from "query-string";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { fetchItems } from "../item.actions";
import { getBrands } from "../../../brand/client/brand.actions";
import { getCategories } from "../../../category/client/category.actions";
import { Label, Form, Button, Card, Divider, Icon, Menu, Container, Image, Segment, Header } from "semantic-ui-react";

export default function ItemList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        dispatch(fetchItems(location.search));
    }, [location.search]);

    const params = queryString.parse(location.search);

    const [brandId, setBrandId] = useState(params.brandId ? params.brandId : "");
    const [categoryId, setCategoryId] = useState(params.categoryId ? params.categoryId : "");
    const [startDate, setStartDate] = useState(params.startDate ? params.startDate : "");
    const [endDate, setEndDate] = useState(params.endDate ? params.endDate : "");

    function filter(e, discard) {
        let q = {};

        if(categoryId && discard !== "category") {
            q.categoryId = categoryId;
        }

        if(brandId && discard !== "brand") {
            q.brandId = brandId;
        }

        if(startDate && endDate && discard !== "date") {
            q.startDate = startDate;
            q.endDate = endDate;
        }

        if(location.search === `?${queryString.stringify(q)}`) return;

        history.push({
            pathname: "items",
            search: queryString.stringify(q)
        });
    }

    function resetFilter() {
        setBrandId("");
        setCategoryId("");
        setStartDate("");
        setEndDate("");

        if(params.categoryId || params.brandId || params.startDate || params.endDate) {
            history.push({ pathname: "items" });
        }
    }

    let brandName = null;
    let categoryName = null;
    let dateRange = null;

    const {data, pagination} = useSelector(state => state.itemReducer.items);
    const categories = useSelector(state => state.categoryReducer.categories);
    const brands = useSelector(state => state.brandReducer.brands);

    if(params.categoryId && categories && categories.length) {
        categoryName = categories.find(x => x._id === params.categoryId).name;
    }

    if(params.brandId && brands && brands.length) {
        brandName = brands.find(x => x._id === params.brandId).name;
    }

    if(params.startDate && params.endDate) {
        dateRange = `${startDate}-${endDate}`;
    }

    const categoryOptions = categories.map(function(option) {
        return { key: option._id, value: option._id, text: option.name };
    });

    const brandOptions = brands.map(function(option) {
        return { key: option._id, value: option._id, text: option.name };
    });

    const cards = data.map(function(item) {
        let activeImage = item.files.filter(x => x.active)[0];
        activeImage = activeImage ? activeImage.secure_url : null;

        return (
            <Link key={item._id} className="ui raised card" to={`/items/${item._id}`}>
                <Card.Content header={item.name} className="ui center aligned"/>
                <Card.Content className="ui center aligned image-wrapper">
                    { activeImage
                        ? <Image src={activeImage} alt={item.name}/>
                        : "Image Not Available!"
                    }
                </Card.Content>
            </Link>
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
                            <Header.Subheader>Filter your gadgets by category, brand and date range <Icon name="angle double down"></Icon></Header.Subheader>
                        </Header.Content>
                    </Header>

                    <Form onSubmit={filter}>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Gadget Category</label>
                                <Form.Select
                                    placeholder="Choose an option"
                                    name="categoryId"
                                    options={categoryOptions}
                                    value={categoryId}
                                    onChange={(event, data) => {setCategoryId(data.value)}}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Gadget Brand</label>
                                <Form.Select
                                    placeholder="Choose an option"
                                    name="brandId"
                                    options={brandOptions}
                                    value={brandId}
                                    onChange={(event, data) => {setBrandId(data.value)}}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Start Date</label>
                                <Form.Input
                                    type="date"
                                    placeholder="Choose a date"
                                    name="startDate"
                                    value={startDate}
                                    onChange={(event, data) => {setStartDate(data.value)}}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>End Date</label>
                                <Form.Input
                                    type="date"
                                    placeholder="Choose a date"
                                    name="endDate"
                                    value={endDate}
                                    onChange={(event, data) => {setEndDate(data.value)}}
                                />
                            </Form.Field>
                        </Form.Group>

                        <Button.Group>
                            <Button type="submit" positive>
                                <Icon name="filter"/> Filter
                            </Button>
                            <Button.Or />
                            <Button type="button" onClick={resetFilter}>
                                <Icon name="undo"/> Reset
                            </Button>
                        </Button.Group>
                    </Form>
                </Segment>
            }

            {categoryName &&
                <Label color="blue">
                    Category: {categoryName} <Icon name="delete" onClick={(e) => { setCategoryId(""); filter(e, "category"); }}/>
                </Label>
            }

            {brandName &&
                <Label color="blue">
                    Brand: {brandName} <Icon name="delete" onClick={(e) => { setBrandId(""); filter(e, "brand"); }}/>
                </Label>
            }

            {dateRange &&
                <Label color="blue">
                    Date Range: {dateRange} <Icon name="delete" onClick={(e) => { setStartDate(""); setEndDate(""); filter(e, "date"); }}/>
                </Label>
            }

            <Divider hidden/>

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
