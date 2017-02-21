import React from 'react';
import { Link } from 'react-router';
import { FormattedDate, FormattedNumber } from 'react-intl';

export default class ItemDetails extends React.Component {
    componentWillMount() {
        this.props.fetchItem(this.props.itemId);
    }

    render() {
        const { item } = this.props.activeItem;

        if(!item) {
            return <h2>Loading...</h2>;
        }

        let defaultFile = item.files.filter(x => x.default)[0];

        return (
            <div>
                <h3>{item.name}</h3>
                <p class="lead">
                    Category: <Link to={`/categories/${item.category._id}`}>{item.category.name}</Link>
                </p>
                <hr/>
                <figure class="figure">
                    <img src={defaultFile && defaultFile.url || item.defaultImage} class="figure-img img-fluid rounded" alt="{item.name}"/>
                </figure>
                <div class="d-flex flex-row">
                    {item.files.map((file) =>
                        <div class="p-2" key={file._id}>
                            <img class="img-thumbnail rounded mx-auto d-block" src={file.url} style={{ width: '15rem', height: '15rem' }}/>
                        </div>
                    )}
                </div>

                <p>Brand: <Link to={`/brands/${item.brand._id}`}>{item.brand.name}</Link></p>
                <p>Price: <FormattedNumber value={item.price} style="currency" currency="BDT"/></p>
                <p>Purchase Date: <FormattedDate value={item.purchaseDate} day="numeric" month="long" year="numeric"/></p>
                <div>
                    <p>Description</p>
                    <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                </div>
                <Link to={`/items/${item._id}/edit`}>Edit</Link> | <Link to={`/items/${item._id}/images`}>Manage images</Link>
            </div>
        );
    }
}
