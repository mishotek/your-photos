import {LitElement, html, css} from 'lit-element';

export class YpFont extends LitElement {
    static get is() {
        return 'yp-font';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: inline-block;
                font-family: 'Lato', sans-serif;
            }
            
            :host([type=title-1]) {
                font-size: var(--font-size-title-1);
            }

            :host([type=title-2]) {
                font-size: var(--font-size-title-2);
            }

            :host([type=title-3]) {
                font-weight: 600;
                font-size: var(--font-size-title-3);
            }

            :host([type=large]) {
                font-weight: 600;
                font-size: var(--font-size-large);
            }

            :host([type=regular]) {
                font-size: var(--font-size-regular);
            }

            :host([type=small]) {
                font-size: var(--font-size-small);
            }

            :host([type=micro]) {
                font-size: var(--font-size-micro);
            }
            
            :host([font-family=Lobster]) {
                font-family: 'Lobster', cursive;
            }

            :host([font-family=Staatliches]) {
                font-family: 'Staatliches', cursive;
            }
            
            :host([bold]) {
                font-weight: bold;
            }
        `;
    }

    render() {
        // language=html
        return html`<slot></slot>`;
    }

    static get properties() {
        return {
            // Type can be:
            // title-1
            // title-2
            // title-3
            // large
            // regular
            // small
            // micro
            type: {
                type: String,
                reflect: true,
            },
            // Lato, Lobster, Staatliches
            fontFamily: {
                type: String,
                reflect: true,
                attribute: 'font-family',
            },
            bold: {
                type: Boolean,
                reflect: true,
            },
        };
    }
}

customElements.define(YpFont.is, YpFont);
