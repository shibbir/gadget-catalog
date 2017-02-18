import React from 'react';

import ItemFormContainer from '../containers/ItemFormContainer';

export default class ItemAddPage extends React.Component {
    render() {
        return (
            <div>
                <h3>Add a new item</h3>
                <hr/>

                <ItemFormContainer form="Create"/>
            </div>
        );
    }
}
