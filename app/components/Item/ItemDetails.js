import React from 'react';
import { hashHistory } from 'react-router';

export default class ItemDetails extends React.Component {
    constructor() {
        super();

        this.gotoEditItemPage = this.gotoEditItemPage.bind(this);
    }

    componentWillMount() {
        this.props.fetchItem(this.props.itemId);
    }

    gotoEditItemPage() {
        hashHistory.push({ pathname: `items/${this.props.itemId}/edit` });
    }

    render() {
        const { item, loading } = this.props.activeItem;

        if(loading || !item) {
            return <h2>Loading...</h2>
        }

        return (
            <div>
                <h3>{item.name}</h3>
                <hr/>
                <figure class="figure">
                    <img src={'/uploads/' + item.file} class="figure-img img-fluid rounded"/>
                </figure>
                <dl>
                    <dt>Description</dt>
                    <dd>{item.description}</dd>
                </dl>
                <a href="javascript:void(0)" onClick={this.gotoEditItemPage}>Edit</a>
            </div>
        );
    }
}
