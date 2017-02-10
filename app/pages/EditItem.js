import React from 'react';

import ItemFormContainer from '../containers/ItemFormContainer';

export default class EditItem extends React.Component {
    render() {
        return (
            <div>
                <h3>Edit item</h3>
                <hr/>

                <ItemFormContainer id={this.props.params.id}/>
            </div>
        );
    }
}
