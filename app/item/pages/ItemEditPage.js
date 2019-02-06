import React from 'react';
import { Divider } from 'semantic-ui-react';
import ItemFormContainer from '../containers/ItemFormContainer';

export default class ItemEditPage extends React.Component {
    render() {
        return (
            <div>
                <h3>Edit item</h3>
                <Divider section/>

                <ItemFormContainer id={this.props.match.params.id} form="Update"/>
            </div>
        );
    }
}
