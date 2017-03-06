import React from 'react';
import { Link } from 'react-router';

export default class CategoryList extends React.Component {
    constructor(props) {
        super();
        props.getCategories();
    }

    render() {
        const { categories } = this.props;

        let cards = categories.map(function(category) {
            let activeImage = category.image;
            activeImage = activeImage ? activeImage.url : category.noImageUrl;

            return (
                <div class="card" key={category._id}>
                    <h6 class="card-header">{category.name}</h6>
                    <img class="card-img-top rounded mx-auto d-block" src={activeImage} alt={category.name}/>
                    <div class="card-footer">
                        { category.items.length <= 0 &&
                            <small class="card-text">Nothing found for this category!</small>
                        }
                        { category.items.length > 0 &&
                            <Link to={`items?filter_by=category&filter_id=${category._id}`} class="btn btn-outline-info btn-sm">
                                {`See all ${category.items.length} items`}
                            </Link>
                        }
                    </div>
                </div>
            );
        });

        return (
            <div id="cards-container">
                <div class="card-deck">
                    {cards}
                </div>
            </div>
        );
    }
}
