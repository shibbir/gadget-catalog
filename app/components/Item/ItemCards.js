import React from 'react';
import { Link } from 'react-router';
import { FormattedDate, FormattedNumber } from 'react-intl';

export default class ItemCards extends React.Component {
    componentWillMount() {
        this.props.fetchItems();
    }

    render() {
        const style = {
            width: '20rem'
        };

        const cardImgTopStyle = {
            width: '15rem'
        };

        const { items: { data, pagination } = items, location } = this.props;

        let cards = data.map(function(item) {
            return (
                <div class="card" style={style} key={item._id}>
                    <img class="card-img-top" src={'/uploads/' + item.file} alt={item.name} style={cardImgTopStyle}/>
                    <div class="card-block">
                        <h5 class="card-title">{item.name}</h5>
                        <p>Category: {item.category.name}</p>
                        <p>Price: <FormattedNumber value={item.price} style="currency" currency="BDT"/></p>
                        <p>Date: <FormattedDate value={item.purchaseDate} day="numeric" month="long" year="numeric"/></p>
                        <Link to={`items/${item._id}`} class="btn btn-primary">Details</Link>
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
