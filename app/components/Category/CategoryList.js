import React from 'react';
import { Link } from 'react-router';
import { Card, Icon, Image, Button } from 'semantic-ui-react';

export default class CategoryList extends React.Component {
    constructor(props) {
        super();
        props.getCategories();
    }

    render() {
        const { categories, user } = this.props;

        let cards = categories.map(function(category) {
            let activeImage = category.file;
            activeImage = activeImage ? activeImage.url : category.noImageUrl;

            return (
                <Card key={category._id} raised>
                    <Card.Content>
                        <Card.Header>{category.name}</Card.Header>
                    </Card.Content>

                    <Card.Content className="ui center aligned">
                        <Image src={activeImage} alt={category.name}/>
                    </Card.Content>

                    <Card.Content extra>
                        <Link to={`items?filter_by=category&filter_id=${category._id}`}>
                            {`See all ${category.items.length} items`}
                        </Link>
                        { user && user.isAdmin &&
                            <div className="right floated">
                                <Button positive compact href={`#/categories/${category._id}/edit`}>
                                    <Icon name="edit"/> Edit
                                </Button>
                            </div>
                        }
                    </Card.Content>
                </Card>
            );
        });

        return (
            <div id="category-cards-container">
                <Card.Group>
                    {cards}
                </Card.Group>
            </div>
        );
    }
}
