import React from 'react';
import { Button, Icon, Divider } from 'semantic-ui-react';

export default class Footer extends React.Component {
    render() {
        return (
            <div>
                <Divider hidden/>
                <footer className="ui inverted vertical footer segment">
                    <div className="ui center aligned container">
                        <div className="ui stackable inverted divided grid">
                            <div className="five wide column">
                                <h4 className="ui inverted header">Community</h4>
                                <div className="ui inverted link list">
                                    <a className="item" href="https://github.com/shibbir/gadget-catalog">GitHub</a>
                                    <a className="item" href="https://github.com/shibbir/gadget-catalog/issues">Issues</a>
                                </div>
                            </div>
                            <div className="five wide column">
                                <h4 className="ui inverted header">Technology stack</h4>
                                <div className="ui inverted link list">
                                    <a className="item" href="https://facebook.github.io/react">React</a>
                                    <a className="item" href="http://redux.js.org">Redux</a>
                                    <a className="item" href="https://nodejs.org/en">Node.js</a>
                                    <a className="item" href="https://www.mongodb.com">MongoDB</a>
                                </div>
                            </div>
                            <div className="six wide right floated column">
                                <h4 className="ui inverted teal header">Help Preserve This Project</h4>
                                <p>
                                    Maintained by <a href="https://shibbir.io">Shibbir Ahmed</a>.
                                    Code licensed <a rel="license" href="https://github.com/shibbir/gadget-catalog/blob/master/LICENSE">MIT</a>
                                </p>
                                <Button className="large teal" href="https://github.com/shibbir/gadget-catalog">
                                    <Icon name="github"/> Fork
                                </Button>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
