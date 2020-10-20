import {LitElement, html} from 'lit-element';
import './common/form-elements/yp-text-field';

export class YpApp extends LitElement {
    static get is() {
        return 'yp-app';
    }

    render() {
        // language=html
        return html`
            <yp-text-field style="margin: 24px; width: 300px;"
                           placeholder="Email"></yp-text-field>
        `;
    }
}

window.customElements.define(YpApp.is, YpApp);
