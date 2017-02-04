import React from 'react';

import AddItemFormContainer from '../containers/AddItemFormContainer';

export default class AddItemPage extends React.Component {
    render() {
        return (
            <div>
                <h3>Add a new item</h3>
                <hr/>

                <AddItemFormContainer/>
            </div>
        );
    }
}
