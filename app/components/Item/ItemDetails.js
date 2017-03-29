import React from 'react';
import { Link } from 'react-router';
import { FormattedDate, FormattedNumber } from 'react-intl';
import { Message, Icon, Card, Divider } from 'semantic-ui-react';

export default class ItemDetails extends React.Component {
    constructor(props) {
        super();
        this.state = { item: null };

        props.fetchItem(props.itemId);
    }

    componentWillReceiveProps(nextProps) {
        const { item } = nextProps.activeItem;

        if(item) {
            this.setState({ item });
        }
    }

    render() {
        let { item } = this.state;

        if(!item) {
            return (
                <Message warning>
                    <Message.Header>
                        <Icon name="warning sign" size="large"/>
                        Warning!
                    </Message.Header>
                    <p>Item not found.</p>
                </Message>
            );
        }

        return (
            <div>
                <h3>{item.name}</h3>
                <p className="lead">
                    Category: <Link to={`/categories/${item.category._id}`}>{item.category.name}</Link>
                </p>

                <Divider section/>

                {item.files.length > 0 &&
                    <Card.Group>
                        {item.files.map((file) =>
                            <Card raised key={file._id} image={file.url}/>
                        )}
                    </Card.Group>
                }

                {item.files.length === 0 &&
                    <Message warning>
                        <Message.Header>
                            <Icon name="warning sign" size="large"/>
                            Warning!
                        </Message.Header>
                        <p>No images are found for this item.</p>
                    </Message>
                }

                <Divider hidden/>

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
