import React from 'react';
import { Divider } from 'semantic-ui-react';
import CategoryFormContainer from '../containers/CategoryFormContainer';

export default class CategoryAddPage extends React.Component {
    render() {
        return (
            <div>
                <h3>Add new category</h3>
                <Divider section />

                <CategoryFormContainer/>
            </div>
        );
    }
}
