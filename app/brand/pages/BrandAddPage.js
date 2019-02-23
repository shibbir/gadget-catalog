import React from 'react';
import { Divider } from 'semantic-ui-react';
import BrandFormContainer from '../containers/BrandFormContainer';

export default class BrandAddPage extends React.Component {
    render() {
        return (
            <div>
                <h3>Add new brand</h3>
                <Divider section />

                <BrandFormContainer form="Create"/>
            </div>
        );
    }
}
