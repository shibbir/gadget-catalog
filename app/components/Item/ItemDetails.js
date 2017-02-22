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

        let activeImage = item.files[0];
        let activeImageUrl = activeImage ? activeImage.url : '';

        activeImage = item.files.filter(x => x.active)[0];
        activeImageUrl = activeImage ? activeImage.url : '';

        return (
            <div>
                <h3>{item.name}</h3>
                <p class="lead">
                    Category: <Link to={`/categories/${item.category._id}`}>{item.category.name}</Link>
                </p>

                <hr/>

                {item.files.length > 0 &&
                    <div>
                        <figure class="figure">
                            <img src={activeImageUrl} class="figure-img img-fluid rounded" alt={item.name}/>
                        </figure>
                        <div class="d-flex flex-row">
                            {item.files.map((file) =>
                                <div class="p-2" key={file._id}>
                                    <img class="img-thumbnail rounded mx-auto d-block"
                                        src={file.url}
                                        onClick={() => activeImageUrl = file.url}
                                        style={{ width: 'auto', height: '10rem', cursor: 'pointer' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                }

                {item.files.length === 0 &&
                    <div class="alert alert-info" role="alert">
                        <h4 class="alert-heading">Warning!</h4>
                        <strong>No images are found for this item.</strong>
                    </div>
                }

                <p>Brand: <Link to={`/brands/${item.brand._id}`}>{item.brand.name}</Link></p>
                <p>Price: <FormattedNumber value={item.price} style="currency" currency="BDT"/></p>
                <p>Purchase Date: <FormattedDate value={item.purchaseDate} day="numeric" month="long" year="numeric"/></p>
                <div>
                    <p>Description</p>
                    <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                </div>
                <Link to={`/items/${item._id}/edit`}>Edit</Link> {item.files.length > 0 && <span> | <Link to={`/items/${item._id}/images`}>Manage images</Link></span>}
            </div>
        );
    }
}
