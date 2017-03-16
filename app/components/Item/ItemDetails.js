import React from 'react';
import { Link } from 'react-router';
import { FormattedDate, FormattedNumber } from 'react-intl';
import { Message, Icon } from 'semantic-ui-react';

export default class ItemDetails extends React.Component {
    constructor(props) {
        super();
        this.state = { item: null, activeImageUrl: ''};

        props.fetchItem(props.itemId);
    }

    componentWillReceiveProps(nextProps) {
        const { item } = nextProps.activeItem;

        if(item) {
            this.setState({ item });

            if(item.files && item.files.length) {
                let activeImageUrl = item.files[0].url;

                let files = item.files.filter(x => x.active);
                if(files && files.length) {
                    activeImageUrl = files[0].url;
                }

                this.setState({ activeImageUrl });
            }
        }
    }

    render() {
        let { item, activeImageUrl } = this.state;

        if(!item) {
            return <h2>Loading...</h2>;
        }

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
                                        onClick={() => this.setState({ activeImageUrl: file.url })}
                                        style={{ width: 'auto', height: '10rem', cursor: 'pointer' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                }

                {item.files.length === 0 &&
                    <Message warning>
                        <Message.Header>
                            <Icon name='warning sign' size='large'/>
                            Warning!
                        </Message.Header>
                        <p>No images are found for this item.</p>
                    </Message>
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
