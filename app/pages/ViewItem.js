import React from 'react';

import ItemStore from '../stores/ItemStore';
import * as ItemActions from '../actions/ItemActions';

export default class ViewItem extends React.Component {
    constructor() {
        super();

        this.state = {
            item: ItemStore.getReceivedItem()
        };
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

    render() {
        return (
            <div>
                <p>Id: {this.state.item._id}</p>
                <p>Title: {this.state.item.title}</p>
            </div>
        );
    }
}
