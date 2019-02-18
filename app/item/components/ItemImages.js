import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Card, Image, Button, Label, Message, Icon } from 'semantic-ui-react';

export default class ItemImages extends React.Component {
    constructor(props) {
        super();
        props.fetchItem(props.itemId);
    }

    render() {
        const { item } = this.props;

        if(!item) {
            return <h2>Loading...</h2>;
        }

        return (
            <div>
                <h3>Manage images</h3>
                <Divider section />

                { item.files.length > 0 &&
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
                                        <Image src={file.url}/>
                                    </Card.Content>

                                    <Card.Content extra>
                                        <div className="ui two buttons">
                                            <Button
                                                color="green"
                                                disabled={file.active}
                                                onClick={this.props.setAsActiveImage.bind(null, this.props.itemId, file._id)}>
                                                Set as default
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
                }
                { item.files.length === 0 &&
                    <Message warning>
                        <Message.Header>
                            <Icon name="warning sign" size="large"/>
                            Warning!
                        </Message.Header>
                        No images are found for this item. <Link to={`/items/${item._id}/edit`}>Consider editing the item</Link>.
                    </Message>
                }
            </div>
        );
    }
}
