import React from 'react';
import { Link } from 'react-router';
import { FormattedDate, FormattedNumber } from 'react-intl';

export default class ItemDetails extends React.Component {
    componentWillMount() {
        this.props.fetchItem(this.props.itemId);
    }

    render() {
        const { item, loading } = this.props.activeItem;

        if(loading || !item) {
            return <h2>Loading...</h2>;
        }

        return (
            <div>
                <h3>{item.name}</h3>
                <p class="lead">
                    Category: <Link to={`/categories/${item.category._id}`}>{item.category.name}</Link>
                </p>
                <hr/>
                <figure class="figure">
                    <img src={'/uploads/' + item.file} class="figure-img img-fluid rounded" alt="{item.name}"/>
                </figure>
                <p>Brand: <Link to={`/brands/${item.brand._id}`}>{item.brand.name}</Link></p>
                <p>Price: <FormattedNumber value={item.price} format="currency"/> BDT</p>
                <p>Purchase Date: <FormattedDate value={item.purchaseDate} day="numeric" month="long" year="numeric"/></p>
                <dl>
                    <dt>Description</dt>
                    <dd>{item.description}</dd>
                </dl>
                <Link to={`/items/${item._id}/edit`}>Edit</Link>
            </div>
        );
    }
}
