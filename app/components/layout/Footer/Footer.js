import React from 'react';

require('./styles.css');

export default class Footer extends React.Component {
    render() {
        return (
            <footer class="bd-footer text-muted">
                <div class="container">
                    <ul class="bd-footer-links">
                        <li><a href="https://github.com/shibbir/digital-catalog">GitHub</a></li>
                        <li><a href="https://twitter.com/getbootstrap">Twitter</a></li>
                        <li><a href="/about/history/">About</a></li>
                    </ul>
                    <p>
                        Maintained by the <a href="https://shibbir.io">Shibbir Ahmed</a>.
                        Code licensed <a rel="license" href="https://github.com/shibbir/digital-catalog/blob/master/LICENSE">MIT</a>
                    </p>
                </div>
            </footer>
        );
    }
}
