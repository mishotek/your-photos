import {LitElement, css, html} from 'lit-element';

export class YpComponentTemplate extends LitElement {
    static get is() {
        return 'yp-component-template';
    }

    static get styles() {
        // language=css
        return css`
            
        `;
    }

    render() {
        // language=html
        return html`
            
        `;
    }

    static get properties() {
        return {};
    }
}

customElements.define(YpComponentTemplate.is, YpComponentTemplate);
