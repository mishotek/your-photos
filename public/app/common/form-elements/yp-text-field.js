import {LitElement, html, css} from 'lit-element';
import '../ui-elements/yp-font';
import {ifDefined} from 'lit-html/directives/if-defined';

export class YpTextField extends LitElement {
    static get is() {
        return 'yp-text-field';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: flex;
                align-items: center;
                position: relative;
            }
            
            .inner-input {
                box-sizing: border-box;
                height: var(--sizing-input-height);
                border: solid 1px var(--color-black-20);
                border-radius: var(--radius-small);
                width: 100%;
                background-color: var(--color-white-80);
                padding: 0 var(--space-tiny);
                font-size: var(--font-size-regular);
                color: var(--color-text-primary-light);
                
                will-change: border;
                transition: border 0.2s;
            }

            .inner-input:hover {
                border: solid 1px var(--color-black-30);
            }

            .inner-input:focus {
                outline: none;
                border: solid 1px var(--color-secondary);
            }
            
            .placeholder {
                position: absolute;
                left: var(--space-tiny);
                font-size: var(--font-size-regular);
                color: var(--color-text-primary-light);
                background-color: var(--color-white-80);
                padding: 0 var(--space-micro);
                
                will-change: font-size, color, transform;
                transition: transform 0.2s, font-size 0.2s, color 0.2s;
            }

            :host([active]) .placeholder {
                transform: translateY(-26px);
                color: var(--color-secondary);
                font-size: var(--font-size-small);
            }
        `;
    }

    render() {
        // language=html
        return html`
            <label class="placeholder" for="inner-input">${this.placeholder}</label>

            <input id="inner-input"
                   class="inner-input"
                   type="${ifDefined(this.type)}"
                   @focus="${this._onFocus}"
                   @blur="${this._onBlur}">
        `;
    }

    static get properties() {
        return {
            // Can be text, password, email, url
            type: {
                type: String,
                reflect: true,
            },
            placeholder: {
                type: String,
                reflect: true,
            },
            active: {
                type: Boolean,
                reflect: true,
            },
            value: {
                type: String,
                reflect: true,
            },
        };
    }

    constructor() {
        super();
    }

    _onFocus() {
        this.active = true;
        this.dispatchEvent(new CustomEvent('focus'));
    }

    _onBlur() {
        this.active = !!this.value;
        this.dispatchEvent(new CustomEvent('blur'));
    }
}

customElements.define(YpTextField.is, YpTextField);
