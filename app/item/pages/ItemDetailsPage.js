import React from 'react';
import ItemDetailsContainer from '../containers/ItemDetailsContainer';

export default class ItemDetailsPage extends React.Component {
    render() {
        return (
            <ItemDetailsContainer id={this.props.params.id}/>
        );
    }
}
