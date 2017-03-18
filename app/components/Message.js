import React from 'react';
import noty from 'noty';

export default class MessageComponent extends React.Component {
    render() {
        const { type, message } = this.props;

        if(message) {
            noty({
                timeout: 5000,
                animation: {
                    open: {height: 'toggle'},
                    close: {height: 'toggle'},
                    easing: 'swing',
                    speed: 300
                },
                template: `
                    <div class="ui floating message negative">
                        <div class="content">
                            <p>${message}</p>
                        </div>
                    </div>
                `
            });
        }

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
