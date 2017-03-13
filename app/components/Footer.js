import React from 'react';
import { Button, Icon, Divider } from 'semantic-ui-react';

export default class Footer extends React.Component {
    render() {
        return (
            <div>
                <Divider hidden/>
                <footer class="ui inverted vertical footer segment">
                    <div class="ui center aligned container">
                        <div class="ui stackable inverted divided grid">
                            <div class="five wide column">
                                <h4 class="ui inverted header">Community</h4>
                                <div class="ui inverted link list">
                                    <a class="item" href="https://github.com/shibbir/gadget-catalog">GitHub</a>
                                    <a class="item" href="https://github.com/shibbir/gadget-catalog/issues">Issues</a>
                                    <a class="item" href="/about/history/">About</a>
                                </div>
                            </div>
                            <div class="five wide column">
                                <h4 class="ui inverted header">Technology stack</h4>
                                <div class="ui inverted link list">
                                    <a class="item" href="https://facebook.github.io/react">React</a>
                                    <a class="item" href="http://redux.js.org">Redux</a>
                                    <a class="item" href="https://nodejs.org/en">Node.js</a>
                                    <a class="item" href="https://www.mongodb.com">MongoDB</a>
                                </div>
                            </div>
                            <div class="six wide right floated column">
                                <h4 class="ui inverted teal header">Help Preserve This Project</h4>
                                <p>
                                    Maintained by <a href="https://shibbir.io">Shibbir Ahmed</a>.
                                    Code licensed <a rel="license" href="https://github.com/shibbir/gadget-catalog/blob/master/LICENSE">MIT</a>
                                </p>
                                <Button class="large teal" href="https://github.com/shibbir/gadget-catalog">
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
