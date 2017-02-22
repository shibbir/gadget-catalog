import React from 'react';
import { Link } from 'react-router';

export default class ItemImages extends React.Component {
    componentWillMount() {
        this.props.fetchItem(this.props.itemId);
    }

    render() {
        const { item } = this.props.activeItem;

        if(!item) {
            return <h2>Loading...</h2>;
        }

        let defaultFile = item.files.filter(x => x.default)[0];

        return (
            <div>
                {item.files.length > 0 &&
                    <div class="d-flex flex-row">
                        {item.files.map((file) =>
                            <div class="p-2" key={file._id}>
                                <img class="img-thumbnail rounded mx-auto d-block" src={file.url} style={{ width: '15rem', height: '15rem' }}/>
                                <div class="btn-group" role="group">
                                    <a onClick={this.props.markAsDefaultImage.bind(null, this.props.itemId, file._id)} href="javascript:void(0)" class="btn btn-outline-success btn-sm">Select as default</a>
                                    <a onClick={this.props.deleteImage.bind(null, this.props.itemId, file._id)} href="javascript:void(0)" class="btn btn-outline-danger btn-sm">Discard</a>
                                </div>
                            </div>
                        )}
                    </div>
                }
                {item.files.length === 0 &&
                    <div class="alert alert-warning" role="alert">
                        <h4 class="alert-heading">Warning!</h4>
                        <strong>No images are found for this item.</strong> <Link to={`/items/${item._id}/edit`} class="alert-link">Consider editing the item</Link>.
                    </div>
                }
            </div>
        );
    }
}
