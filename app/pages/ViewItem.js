import React from 'react';
import { hashHistory } from 'react-router';

import ItemStore from '../stores/ItemStore';
import * as ItemActions from '../actions/ItemActions';

export default class ViewItem extends React.Component {
    constructor() {
        super();

        this.state = {item: {}};

        this.editItem = this.editItem.bind(this);
    }

    componentDidMount() {
        ItemActions.getItem(this.props.params.id);
    }

    componentWillMount() {
        ItemStore.on('receiveItem', () => {
            this.setState({ item: ItemStore.getReceivedItem() });
        });
    }

    componentWillUnmount() {
        ItemStore.removeListener('receiveItem', () => {
            this.setState({ item: ItemStore.getReceivedItem() });
        });
    }

    editItem() {
        hashHistory.push({ pathname: `items/${this.state.item._id}/edit` });
    }

    render() {
        return (
            <div>
                <h3>{this.state.item.name}</h3>
                <hr/>
                <figure class="figure">
                    <img src={'/uploads/' + this.state.item.file} class="figure-img img-fluid rounded"/>
                </figure>
                <dl>
                    <dt>Description</dt>
                    <dd>{this.state.item.description}</dd>
                </dl>
                <a href="javascript:void(0)" onClick={this.editItem}>Edit</a>
            </div>
        );
    }
}
