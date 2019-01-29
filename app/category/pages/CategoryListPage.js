import React from 'react';
import { Divider } from 'semantic-ui-react';
import CategoryListContainer from '../containers/CategoryListContainer';

export default class CategoryListPage extends React.Component {
    render() {
        return (
            <div>
                <h3>Available categories</h3>
                <Divider section/>

                <CategoryListContainer/>
            </div>
        );
    }
}
