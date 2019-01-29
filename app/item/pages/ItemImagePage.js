import React from 'react';
import { Divider } from 'semantic-ui-react';

import ItemImageContainer from '../containers/ItemImageContainer';

export default class ItemImagePage extends React.Component {
    render() {
        return (
            <div>
                <h3>Manage images</h3>
                <Divider section />

                <ItemImageContainer id={this.props.params.id}/>
            </div>
        );
    }
}
