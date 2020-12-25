import {css, html, LitElement} from 'lit-element';
import '../../../lib-icon/lib-icon';

export class LibCheckbox extends LitElement {
    static get is() {
        return 'lib-checkbox';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: inline-flex;
                align-items: center;
            }
            
            :host([value]) .icon {
                fill: var(--color-primary-80)
            }
            
            .icon {
                position: absolute;
                fill: var(--color-black-80);
                
                will-change: fill;
                transition: fill 0.2s;
            }
            
            .icon-wrapper {
                position: relative;
                height: var(--space-s-large);
                width: var(--space-s-large);
                border-radius: var(--radius-circle);
                background: var(--color-primary-0);
                display: flex;
                align-items: center;
                justify-content: center;
                
                will-change: background;
                transition: background 0.2s;
            }

            .icon-wrapper:hover {
                background: var(--color-primary-20);
            }

            .icon-wrapper:active {
                background: var(--color-primary-30);
            }
            
            .icon-wrapper::before {
                display: block;
                content: "";
                background: var(--color-white-80);
                position: absolute;
                height: 16px;
                width: 16px;
                border-radius: 4px;
            }
        `;
    }

    render() {
        // language=html
        return html`
                <div class="icon-wrapper">
                    <lib-icon
                            class="icon"
                            icon="${this.value ? 'check_box' :'check_box_outline_blank'}">
                    </lib-icon>
                </div>
            `;
    }

    static get properties() {
        return {
            value: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.addEventListener('click', () => this.toggle());
    }

    toggle() {
        this.value = !this.value;
        this._notifyValueChange();
    }

    _notifyValueChange() {
        this.dispatchEvent(new CustomEvent('value-change', {detail: {value: this.value}}));
    }
}

customElements.define(LibCheckbox.is, LibCheckbox);
