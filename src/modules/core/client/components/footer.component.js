import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default function Footer() {
    return (
        <footer className="ui inverted vertical footer segment">
            <div className="ui center aligned container">
                <div className="ui stackable inverted divided grid">
                    <div className="four wide column">
                        <h4 className="ui inverted header">Community</h4>
                        <div className="ui inverted link list">
                            <a className="item" href="https://github.com/shibbir/gadget-catalog">GitHub</a>
                            <a className="item" href="https://github.com/shibbir/gadget-catalog/issues">Issues</a>
                        </div>
                    </div>
                    <div className="four wide column">
                        <h4 className="ui inverted header">Technology stack</h4>
                        <div className="ui inverted link list">
                            <a className="item" href="https://reactjs.org/">React</a>
                            <a className="item" href="https://redux.js.org/">Redux</a>
                            <a className="item" href="https://expressjs.com/">Express</a>
                            <a className="item" href="https://www.mongodb.com/">MongoDB</a>
                            <a className="item" href="http://www.passportjs.org/">Passport</a>
                        </div>
                    </div>
                    <div className="eight wide right floated column">
                        <h4 className="ui inverted teal header">Help Preserve This Project!</h4>
                        <p>
                            Developed by <a href="https://shibbir.io">Shibbir Ahmed</a>.
                            Code licensed <a rel="license" href="https://github.com/shibbir/gadget-catalog/blob/master/LICENSE">MIT</a>.
                        </p>
                        <Button className="large teal" href="https://github.com/shibbir/gadget-catalog">
                            <Icon name="github"/> Star
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
