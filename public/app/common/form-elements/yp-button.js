import {LitElement, css, html} from 'lit-element';
import '../ui-elements/yp-font';
import('../../library/lib-icon/lib-icon');
import {ifDefined} from 'lit-html/directives/if-defined';

export class YpButton extends LitElement {
    static get is() {
        return 'yp-button';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: inline-block;   
            }
                
            .btn {
                display: inline-flex;
                align-items: center;
                border-radius: var(--radius-small);
                cursor: pointer;
                box-sizing: border-box;
                text-decoration: none;
                color: inherit;
                
                will-change: color, border, background-color;
                transition: background-color 0.1s, color 0.1s, border 0.1s;
            }
            
            :host([size=medium]) .btn {
                height: var(--space-large);
            }

            :host([size=small]) .btn {
                height: var(--space-s-large);
            }
            
            :host([type=contained]) .btn {
                color: var(--color-white-80);
                background-color: var(--color-primary-80);
                padding: 0 var(--space-base);
            }

            :host([type=contained]):hover .btn {
                background-color: var(--color-primary-60);
            }

            :host([type=outlined]) .btn {
                color: var(--color-primary-80);
                border: solid 1px var(--color-primary-80);
                background-color: transparent;
                padding: 0 var(--space-base);
            }

            :host([type=outlined]:hover) .btn {
                background-color: var(--color-black-10);
            }

            :host([type=outlined]:active) .btn {
                background-color: var(--color-black-20);
            }

            :host([type=text]) .btn {
                color: var(--color-primary-80);
                background: var(--color-black-0);
                padding: 0 var(--space-tiny);
                font-weight: bold;
            }

            :host([type=text]:hover) .btn {
                color: var(--color-primary-80);
                background: var(--color-black-10);
            }

            :host([type=text]:active) .btn {
                color: var(--color-primary-80);
                background: var(--color-black-20);
            }
            
            :host([disabled]) .btn {
                opacity: 0.3;
                cursor: default;
            }
            
            .icon {
                --size: var(--space-small);
                margin-right: var(--space-micro);
            }
        `;
    }

    render() {
        // language=html
        return html`
            <a class="btn" href="${ifDefined(this.href)}">
                
                ${this.icon ? html`
                    <lib-icon class="icon" icon="${this.icon}"></lib-icon>
                ` : ''}
                
                <yp-font type="${this.size === 'medium' ? 'regular' : 'small'}">
                    <slot></slot>
                </yp-font>
            </a>
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
            href: {
                type: String,
                reflect: true,
            },
            icon: {
                type: String,
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
