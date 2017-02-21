import React from 'react';

import ItemImageContainer from '../containers/Item/ItemImageContainer';

export default class ItemImagePage extends React.Component {
    render() {
        return (
            <div>
                <h3>Manage images</h3>
                <hr/>

                <ItemImageContainer id={this.props.params.id}/>
            </div>
        );
    }
}
