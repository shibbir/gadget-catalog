import React from 'react';

import ItemListContainer from '../containers/Item/ItemListContainer';

export default class ItemListPage extends React.Component {
    render() {
        return <ItemListContainer location={this.props.location}/>;
    }
}
