import React from 'react';
import { Link, hashHistory } from 'react-router';
import { FormattedDate, FormattedNumber } from 'react-intl';

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

    filterBy(event) {
        let newLocation = {
            pathname: 'items'
        };

        if(event.target.value) {
            newLocation.query = { ...this.props.location.query, filter_by: event.target.id, filter_id: event.target.value };
        }

        hashHistory.push(newLocation);
    }

    render() {
        const { items: { data, pagination } = items, location, brands, categories } = this.props;

        let categoryOptions = categories.map(function(option) {
            return (
                <option key={option._id} value={option._id}>
                    {option.name}
                </option>
            );
        });

        let brandOptions = brands.map(function(option) {
            return (
                <option key={option._id} value={option._id}>
                    {option.name}
                </option>
            );
        });

        let cards = data.map(function(item) {
            let activeImage = item.files.filter(x => x.active)[0];
            activeImage = activeImage ? activeImage : item.files[0];
            activeImage = activeImage ? activeImage.url : item.noImageUrl;

            return (
                <div class="card" key={item._id}>
                    <h6 class="card-header">{item.name}</h6>
                    <img class="card-img-top rounded mx-auto d-block" src={activeImage} alt={item.name}/>
                    <div class="card-block">
                        <div>Category: {item.category.name}</div>
                        <div>Brand: {item.brand.name}</div>
                        <div>Price: <FormattedNumber value={item.price} style="currency" currency="BDT"/></div>
                        <div>Date: <FormattedDate value={item.purchaseDate} day="numeric" month="long" year="numeric"/></div>
                    </div>
                    <div class="card-footer">
                        <Link to={`items/${item._id}`} class="btn btn-outline-info btn-sm">Details</Link>
                    </div>
                </div>
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
            let paginationLinkClass = page.isActive ? 'page-item active' : 'page-item';

            return (
                <li class={paginationLinkClass} key={page.idx}>
                    <Link to={page.link} class="page-link">{page.idx}</Link>
                </li>
            );
        });

        return (
            <div>
                <form class="form-inline">
                    <label class="mr-sm-2" for="category">Filter By Category:</label>
                    <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="category" onChange={this.filterBy} value={location.query.filter_id}>
                        <option value="">None</option>
                        {categoryOptions}
                    </select>

                    <label class="mr-sm-2" for="brand">Filter By Brand:</label>
                    <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="brand" onChange={this.filterBy} value={location.query.filter_id}>
                        <option value="">None</option>
                        {brandOptions}
                    </select>
                </form>
                <hr/>
                { cards.length > 0 &&
                    <div id="cards-container">
                        <div class="card-deck">
                            {cards}
                        </div>

                        { pagination.pages !== 1 &&
                            <nav>
                                <ul class="pagination justify-content-center">
                                    {paginationLinks}
                                </ul>
                            </nav>
                        }
                    </div>
                }
                { cards.length === 0 &&
                    <div class="alert alert-success" role="alert">
                        <h4 class="alert-heading">Nothing found!</h4>
                        To add an item please <Link to="items/add" class="alert-link">click here</Link>.
                    </div>
                }
            </div>
        );
    }
}
