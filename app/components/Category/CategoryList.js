import React from 'react';
import { Link } from 'react-router';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';

export default class CategoryList extends React.Component {
    constructor(props) {
        super();
        props.getCategories();
    }

    render() {
        const { categories } = this.props;

        let cards = categories.map(function(category) {
            let activeImage = category.file;
            activeImage = activeImage ? activeImage.url : category.noImageUrl;

            return (
                <Card key={category._id} raised>
                    <Card.Content>
                        <Card.Header>{category.name}</Card.Header>
                    </Card.Content>

                    <Label color="red" corner="right" size="mini">
                        <Icon name="lock"/>
                    </Label>

                    <Image src={activeImage} alt={category.name}/>

                    <Card.Content extra>
                        <Link to={`items?filter_by=category&filter_id=${category._id}`}>
                            {`See all ${category.items.length} items`}
                        </Link>
                        <div class="right floated">
                            <Button positive compact disabled={category.readonly} href={`#/categories/${category._id}/edit`}>
                                <Icon name="edit"/> Edit
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            );
        });

        return (
            <div id="cards-container">
                <Card.Group>
                    {cards}
                </Card.Group>
            </div>
        );
    }
}
