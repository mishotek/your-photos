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
                flex-direction: column;
                position: relative;
            }
            
            .input-wrapper {
                display: flex;
                align-items: center;
            }
            
            .inner-input {
                box-sizing: border-box;
                height: var(--sizing-input-height);
                border: solid 1px var(--color-black-20);
                border-radius: var(--radius-small);
                width: 100%;
                background-color: var(--color-white-80);
                padding: 0 var(--space-small);
                font-size: var(--font-size-regular);
                font-family: 'Lato', sans-serif;
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
            
            .label {
                position: absolute;
                left: var(--space-tiny);
                font-size: var(--font-size-regular);
                color: var(--color-text-primary-light);
                background-color: var(--color-white-80);
                padding: 0 var(--space-tiny);

                font-family: 'Lato', sans-serif;
                will-change: font-size, color, transform;
                transition: transform 0.2s, font-size 0.2s, color 0.2s;
            }

            .message {
                padding: var(--space-micro) 0;
                height: var(--space-base);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
            :host([active]) .label {
                transform: translateY(-26px);
                color: var(--color-secondary);
                font-size: var(--font-size-small);
            }
            
            :host([error]) .inner-input {
                border: solid 1px var(--color-error);
            }

            :host([error]) .message {
                color: var(--color-error);
            }
            
            :host([error][active]) .label {
                color: var(--color-error);
            }

            :host([success]) .inner-input {
                border: solid 1px var(--color-success);
            }

            :host([success]) .message {
                color: var(--color-success);
            }
            
            :host([success][active]) .label {
                color: var(--color-success);
            }
        `;
    }

    render() {
        // language=html
        return html`
            <div class="input-wrapper">
                <label class="label" for="inner-input">${this.label}</label>

                <input id="inner-input"
                       class="inner-input"
                       type="${ifDefined(this.type)}"
                       @change="${this._onChange}"
                       @focus="${this._onFocus}"
                       @blur="${this._onBlur}">
            </div>
            
            <yp-font class="message" type="micro">${this.message}</yp-font>
        `;
    }

    static get properties() {
        return {
            // Can be text, password, email, url
            type: {
                type: String,
                reflect: true,
            },
            label: {
                type: String,
                reflect: true,
            },
            message: {
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
            error: {
                type: Boolean,
                reflect: true,
            },
            success: {
                type: Boolean,
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

    _onChange(event) {
        this.value = event.target.value;
        console.log(event);
        this.dispatchEvent(new CustomEvent('onchange', {
            detail: {
                value: this.value,
            },
        }));
    }
}

customElements.define(YpTextField.is, YpTextField);
