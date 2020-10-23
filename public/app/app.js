import {LitElement, html} from 'lit-element';
import './modules/auth/yp-auth-page';

export class YpApp extends LitElement {
    static get is() {
        return 'yp-app';
    }

    render() {
        // language=html
        return html`
            <yp-auth-page></yp-auth-page>
        `;
    }
}

window.customElements.define(YpApp.is, YpApp);
