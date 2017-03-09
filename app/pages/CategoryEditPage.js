import React from 'react';

import CategoryFormContainer from '../containers/Category/CategoryFormContainer';

export default class CategoryEditPage extends React.Component {
    render() {
        return (
            <div>
                <h3>Edit category</h3>
                <hr/>

                <CategoryFormContainer id={this.props.params.id} form="Update"/>
            </div>
        );
    }
}
