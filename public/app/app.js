import {LitElement, html} from 'lit-element';

export class YpApp extends LitElement {
    static get is() {
        return 'yp-app';
    }

    render() {
        return html`rame`;
    }
}

window.customElements.define(YpApp.is, YpApp);
