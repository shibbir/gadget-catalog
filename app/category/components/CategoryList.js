import React from 'react';
import { Link } from 'react-router-dom';
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
            activeImage = activeImage ? activeImage.secure_url : category.noImageUrl;

            return (
                <Card key={category._id} raised>
                    <Card.Content>
                        <Card.Header>{category.name}</Card.Header>
                    </Card.Content>

                    <Card.Content className="ui center aligned">
                        <Image src={activeImage} alt={category.name}/>
                    </Card.Content>

                    <Card.Content extra>
                        { category.items.length > 0 &&
                            <Link to={`/items?categoryId=${category._id}`}>
                                <Icon color='teal' name="external alternate"/>
                                {`${category.items.length} item(s)`}
                            </Link>
                        }
                        { category.items.length === 0 &&
                            <>You don't have any items</>
                        }
                        { user && user.isAdmin &&
                            <div className="right floated">
                                <Link to={`categories/${category._id}/edit`}>
                                    <Icon color='teal' name="edit"/>
                                    Edit
                                </Link>
                            </div>
                        }
                    </Card.Content>
                </Card>
            );
        });

        return (
            <div id="category-cards-container">
                <Card.Group itemsPerRow={4} stackable>
                    {cards}
                </Card.Group>
            </div>
        );
    }
}
