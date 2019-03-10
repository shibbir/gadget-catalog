import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedDate, FormattedNumber } from 'react-intl';
import { Label, Message, Icon, Divider, Grid, Image, Item, Button, Header, Card, Breadcrumb } from 'semantic-ui-react';

export default class ItemDetail extends React.Component {
    constructor(props) {
        super();

        props.fetchItem(props.itemId);
    }

    render() {
        let { item } = this.props;

        if(!item) {
            return (
                <Message icon warning>
                    <Icon name="warning sign" size="large"/>
                    <Message.Content>
                        <Message.Header>Warning!</Message.Header>
                        Item not found.
                    </Message.Content>
                </Message>
            );
        }

        if(item.files && item.files.length) {
            item.activeImage = _.find(item.files, { active: true });
        }

        const sections = [
            { key: 'Items', content: 'Items', href: '#/items' },
            { key: 'Category', content: `${item.category.name}`, href: `#/items?categoryId=${item.category._id}` },
            { key: `${item.name}`, content: `${item.name}`, active: true }
        ];

        return (
            <div>
                <Breadcrumb size='small' icon='right chevron' sections={sections}/>

                <Divider hidden/>

                <Grid>
                    <Grid.Column width={10}>
                        { item.activeImage &&
                            <Card raised fluid>
                                <Card.Content className="center aligned">
                                    <Image src={item.activeImage.url} alt={item.name}/>
                                </Card.Content>
                            </Card>
                        }
                        { item.files.length === 0 &&
                            <Message warning icon>
                            <Icon name="warning sign" size="large"/>
                                <Message.Content>
                                    <Message.Header>Warning!</Message.Header>
                                    No images are found for this item. <Link to={`/items/${item._id}/edit`}>Consider editing the item</Link>.
                                </Message.Content>
                            </Message>
                        }
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
                        <Button color="red"
                            onClick={this.props.deleteItem.bind(null, this.props.itemId)}>
                            <Icon name="trash"/> Delete
                        </Button>
                    </Grid.Column>
                </Grid>

                { item.files.length > 0 &&
                    <div>
                        <Divider hidden/>
                        <h2>Manage images</h2>
                        <Divider section/>

                        <Card.Group>
                            { item.files.map((file) => {
                                return (
                                    <Card key={file._id} raised>
                                        { file.active &&
                                            <Label color="teal" corner="right" size="small">
                                                <Icon name="pin"/>
                                            </Label>
                                        }

                                        <Card.Content className="ui center aligned">
                                            <Image src={file.url} size='medium'/>
                                        </Card.Content>

                                        <Card.Content extra>
                                            <div className="ui two buttons">
                                                <Button
                                                    color="green"
                                                    disabled={file.active}
                                                    onClick={this.props.setAsActiveImage.bind(null, this.props.itemId, file._id)}>
                                                    Set as active
                                                </Button>
                                                <Button
                                                    color="red"
                                                    onClick={this.props.deleteImage.bind(null, this.props.itemId, file._id)}>
                                                    Discard
                                                </Button>
                                            </div>
                                        </Card.Content>
                                    </Card>
                                );
                            })}
                        </Card.Group>
                    </div>
                }
            </div>
        );
    }
}
