import React from 'react';
import { Link } from 'react-router';
import { FormattedDate, FormattedNumber } from 'react-intl';
import { Message, Icon, Divider, Grid, Image, Item, Button, Header, Card, Breadcrumb } from 'semantic-ui-react';

export default class ItemDetails extends React.Component {
    constructor(props) {
        super();
        this.state = { item: null, framedImage: '//res.cloudinary.com/shibbir/image/upload/v1487437653/miscellaneous/no-img.png' };

        props.fetchItem(props.itemId);

        this.setAsFramedImage = this.setAsFramedImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { item } = nextProps.activeItem;

        if(item) {
            this.setState({ item });

            if(item.files && item.files.length) {
                this.setAsFramedImage(item.files[0]);
            }
        }
    }

    setAsFramedImage(file) {
        this.setState({ framedImage: file.url });
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

        const sections = [
            { key: 'Items', content: 'Items', link: true, href: '#/items' },
            { key: 'Category', content: `${item.category.name}`, link: true, href: `#/items?filter_by=category&filter_id=${item.category._id}` },
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
                                <Image src={this.state.framedImage}/>
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
                                <Card key={file._id} raised onClick={this.setAsFramedImage.bind(this, file)}>
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
