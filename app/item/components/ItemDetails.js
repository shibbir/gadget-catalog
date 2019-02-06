import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedDate, FormattedNumber } from 'react-intl';
import { Message, Icon, Divider, Grid, Image, Item, Button, Header, Card, Breadcrumb } from 'semantic-ui-react';

export default class ItemDetails extends React.Component {
    constructor(props) {
        super();

        props.fetchItem(props.itemId);

        this.setActiveImage = this.setActiveImage.bind(this);
    }

    setActiveImage(file) {
        this.setState({ framedImage: file.url });
    }

    render() {
        let { item } = this.props.activeItem;

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

        if(item.files && item.files.length) {
            item.activeImage = item.files[0];
        }

        const sections = [
            { key: 'Items', content: 'Items', href: '#/items' },
            { key: 'Category', content: `${item.category.name}`, href: `#/items?filter_by=category&filter_id=${item.category._id}` },
            { key: `${item.name}`, content: `${item.name}`, active: true }
        ];

        return (
            <div>
                <Breadcrumb size='small' icon='right chevron' sections={sections}/>

                <Divider hidden/>

                <Grid>
                    <Grid.Column width={10}>
                        <Card raised fluid>
                            <Card.Content className="center aligned">
                                { item.activeImage
                                    ? <Image src={item.activeImage.url} alt={item.name}/>
                                    : <Icon name='image' size='massive'/>
                                }
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <Item>
                            <Item.Content>
                                <Header as='h3'>{item.name}</Header>
                                <Divider hidden/>

                                <Divider horizontal>Meta Informations</Divider>

                                <Item.Meta>
                                    <div>Category: <Link to={`items?filter_by=category&filter_id=${item.category._id}`}>{item.category.name}</Link></div>
                                    <div>Brand: <Link to={`items?filter_by=brand&filter_id=${item.brand._id}`}>{item.brand.name}</Link></div>
                                    { item.price &&
                                        <div>Price: <FormattedNumber value={item.price} style="currency" currency="BDT"/></div>
                                    }
                                    <div>Purchase Date: <FormattedDate value={item.purchaseDate} day="numeric" month="long" year="numeric"/></div>
                                </Item.Meta>

                                <Divider horizontal>Description</Divider>

                                <Item.Description>
                                    { item.description &&
                                        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                                    }
                                    { !item.description &&
                                        <div>Not available at the moment.</div>
                                    }
                                </Item.Description>
                            </Item.Content>
                        </Item>

                        <Divider section/>

                        <Button color="blue" href={`#/items/${item._id}/edit`}>
                            <Icon name="pencil"/> Edit
                        </Button>

                        { item.files.length > 0 &&
                            <Button color="violet" href={`#/items/${item._id}/images`}>
                                <Icon name="image"/> Manage images
                            </Button>
                        }
                    </Grid.Column>
                </Grid>

                { item.files.length > 0 &&
                    <div id="item-images">
                        <Divider hidden/>
                        <Card.Group>
                            { item.files.map((file) =>
                                <Card key={file._id} raised onClick={this.setActiveImage.bind(this, file)}>
                                    <Card.Content className="center aligned">
                                        <Image src={file.url} size="small"/>
                                    </Card.Content>
                                </Card>
                            )}
                        </Card.Group>
                    </div>
                }
            </div>
        );
    }
}
