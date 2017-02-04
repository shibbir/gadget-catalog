import React from 'react';
import { hashHistory } from 'react-router';

import store from '../store';
import { fetchItem } from '../actions/ItemActions';
import ItemConstants from '../constants/ItemConstants';

export default class ViewItem extends React.Component {
    constructor() {
        super();

        this.post = {};

        this.gotoEditItemPage = this.gotoEditItemPage.bind(this);
    }

    componentWillMount() {
        store.dispatch(fetchItem(this.props.params.id)).then(result => {
            const { type, payload } = result.action;

            if(type === ItemConstants.FETCH_ITEM_FULFILLED) {
                this.post = payload;
            }
        });
    }

    gotoEditItemPage() {
        hashHistory.push({ pathname: `items/${this.post._id}/edit` });
    }

    render() {
        return (
            <div>
                <h3>{this.post.name}</h3>
                <hr/>
                <figure class="figure">
                    <img src={'/uploads/' + this.post.file} class="figure-img img-fluid rounded"/>
                </figure>
                <dl>
                    <dt>Description</dt>
                    <dd>{this.post.description}</dd>
                </dl>
                <a href="javascript:void(0)" onClick={this.gotoEditItemPage}>Edit</a>
            </div>
        );
    }
}
