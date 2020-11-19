import {LitElement, html} from 'lit-element';
import './modules/auth/yp-auth-page';
import './router/lit-router';

export class YpApp extends LitElement {
    static get is() {
        return 'yp-app';
    }

    render() {
        // language=html
        return html`
            <lit-router>
                <lit-route path="/">
                    root
                </lit-route>
                <lit-route path="/auth">
                    <yp-auth-page></yp-auth-page>
                </lit-route>
            </lit-router>
        `;
    }

    constructor() {
        super();
        this._goToHash();
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
    }

    _goToHash() {
        const hasHash = !!window.location.hash;
        if (!hasHash) {
            window.location.href = '/#/';
        }
    }
}

window.customElements.define(YpApp.is, YpApp);
