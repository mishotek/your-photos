import {LitElement, html} from 'lit-element';
import '../../common/ui-elements/yp-header';

export class YpHomePage extends LitElement {
    static get is() {
        return 'yp-home-page';
    }

    render() {
        // language=html
        return html`
            <yp-header></yp-header>
        `;
    }
}

customElements.define(YpHomePage.is, YpHomePage);
