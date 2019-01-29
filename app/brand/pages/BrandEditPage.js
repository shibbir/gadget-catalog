import React from 'react';
import { Divider } from 'semantic-ui-react';
import BrandFormContainer from '../containers/BrandFormContainer';

export default class BrandEditPage extends React.Component {
    render() {
        return (
            <div>
                <h3>Edit brand</h3>
                <Divider section/>

                <BrandFormContainer id={this.props.params.id} form="Update"/>
            </div>
        );
    }
}
