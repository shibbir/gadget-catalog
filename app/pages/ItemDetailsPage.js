import React from 'react';
import { hashHistory } from 'react-router';
import ItemDetailsContainer from '../containers/Item/ItemDetailsContainer';

export default class ItemDetailsPage extends React.Component {
    render() {
        return (
            <ItemDetailsContainer id={this.props.params.id}/>
        );
    }
}
