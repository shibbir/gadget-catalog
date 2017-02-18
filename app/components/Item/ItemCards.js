import React from 'react';
import { Link } from 'react-router';
import { FormattedDate, FormattedNumber } from 'react-intl';

require('./item-cards.css');

export default class ItemCards extends React.Component {
    componentWillMount() {
        this.props.fetchItems();
    }

    render() {
        const { items: { data, pagination } = items, location } = this.props;

        let cards = data.map(function(item) {
            let defaultFile = item.files.filter(x => x.default)[0];

            return (
                <div class="card" key={item._id}>
                    <h6 class="card-header">{item.name}</h6>
                    <img class="card-img-top rounded mx-auto d-block" src={defaultFile && defaultFile.url || item.defaultImage} alt={item.name}/>
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
                link: `/items?page=${idx}`,
                isActive: !location.query.page && idx === 1 || +location.query.page === idx
            });
        }

        paginationLinks = paginationLinks.map(function(page) {
            let paginationLinkClass = page.isActive ? 'page-item active' : 'page-item';

            return (
                <li class={paginationLinkClass} key={page.idx} >
                    <Link to={page.link} class="page-link">{page.idx}</Link>
                </li>
            );
        });

        return (
            <div>
                <div class="card-deck">
                    {cards}
                </div>

                <nav>
                    <ul class="pagination justify-content-center">
                        {paginationLinks}
                    </ul>
                </nav>
            </div>
        );
    }
}
