import React from 'react';
import { Divider } from 'semantic-ui-react';
import BrandListContainer from '../containers/Brand/BrandListContainer';

export default class BrandListPage extends React.Component {
    render() {
        return (
            <div>
                <h3>Available brands</h3>
                <Divider section/>

                <BrandListContainer/>
            </div>
        );
    }
}
