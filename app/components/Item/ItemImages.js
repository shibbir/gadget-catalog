import React from 'react';
import { Link } from 'react-router';

export default class ItemImages extends React.Component {
    constructor(props) {
        super();
        props.fetchItem(props.itemId);
    }

    render() {
        const { item } = this.props.activeItem;

        if(!item) {
            return <h2>Loading...</h2>;
        }

        return (
            <div>
                {item.files.length > 0 &&
                    <div class="d-flex flex-row">
                        {item.files.map((file) => {
                            let activeButtonClass = file.active ? 'btn btn-outline-success btn-sm active' : 'btn btn-outline-success btn-sm';
                            let activeButtonText = file.active ? 'Default selected' : 'Set default';

                            return (
                                <div class="p-2" key={file._id}>
                                    <img class="img-thumbnail rounded mx-auto d-block" src={file.url} style={{ width: '15rem', height: '15rem' }}/>
                                    <div class="btn-group" role="group">
                                        <a href="javascript:void(0)" class={activeButtonClass}
                                            onClick={this.props.setAsActiveImage.bind(null, this.props.itemId, file._id)}>{activeButtonText}</a>
                                        <a href="javascript:void(0)" class="btn btn-outline-danger btn-sm"
                                            onClick={this.props.deleteImage.bind(null, this.props.itemId, file._id)}>Discard</a>
                                    </div>
                                </div>
                            );
                        })}
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
