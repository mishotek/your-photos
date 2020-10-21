import {LitElement, css, html} from 'lit-element';
import '../ui-elements/yp-font';

export class YpButton extends LitElement {
    static get is() {
        return 'yp-button';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: inline-flex;
                align-items: center;
                border-radius: var(--radius-small);
                cursor: pointer;
                box-sizing: border-box;
                
                will-change: color, border, background-color;
                transition: background-color 0.1s, color 0.1s, border 0.1s;
            }
            
            :host([size=medium]) {
                height: var(--space-large);
            }

            :host([size=small]) {
                height: var(--space-s-large);
            }
            
            :host([type=contained]) {
                color: var(--color-white-80);
                background-color: var(--color-secondary);
                padding: 0 var(--space-base);
            }

            :host([type=contained]):hover {
                background-color: var(--color-secondary-dark);
            }

            :host([type=outlined]) {
                color: var(--color-secondary);
                border: solid 1px var(--color-secondary);
                background-color: transparent;
                padding: 0 var(--space-base);
            }

            :host([type=outlined]:hover) {
                background-color: var(--color-black-10);
            }

            :host([type=outlined]:active) {
                background-color: var(--color-black-20);
            }

            :host([type=text]) {
                color: var(--color-secondary);
            }
            
            :host([disabled]) {
                opacity: 0.3;
                cursor: default;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <yp-font type="${this.size === 'medium' ? 'regular' : 'small'}">
                <slot></slot>
            </yp-font>
        `;
    }

    static get properties() {
        return {
            // Types: text outlined contained
            type: {
                type: String,
                reflect: true,
            },
            // Size: medium small
            size: {
                type: String,
                reflect: true,
            },
            disabled: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    constructor() {
        super();
        this.type = 'contained';
        this.size = 'medium';
    }
}

customElements.define(YpButton.is, YpButton);
