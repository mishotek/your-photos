import {css, html, LitElement} from 'lit-element';
import '../form-elements/yp-button';
import '../ui-elements/yp-font';

export class YpPhotoActionsHeader extends LitElement {
    static get is() {
        return 'yp-photo-actions-header';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: flex;
                position: fixed;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding: 0 var(--space-base);
                height: var(--space-x-large);
                background: var(--color-white-80);
                box-shadow: var(--shadow-40);
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
                
                will-change: transform;
                transition: transform 0.3s ease-in-out;
            }
            
            :host(:not([visible])) {
                transform: translateY(calc(-2 * var(--space-x-large)));
            }
            
            .flex-center {
                display: flex;
                align-items: center;
            }
            
            .count {
                margin-left: var(--space-x-small);
                color: var(--color-black-50);
            }
            
            @media only screen and (max-width: 600px) {
                .count-text {
                    display: none;
                }
            }
        `;
    }

    render() {
        // language=html
        return html`
            <div class="flex-center">
                <yp-button
                        type="icon"
                        icon="close"
                        @click="${() => this._notify('unselect')}"></yp-button>
                <yp-font class="count" type="large">
                    ${this.selectedCount}<span class="count-text"> selected</span>
                </yp-font>
            </div>

            <div class="flex-center">
                <yp-button
                        type="icon"
                        icon="add"
                        @click="${() => this._notify('add')}"></yp-button>
                <yp-button
                        type="icon"
                        icon="file_download"
                        @click="${() => this._notify('download')}"></yp-button>
                <yp-button
                        type="icon"
                        icon="delete"
                        @click="${() => this._notify('delete')}"></yp-button>
            </div>
        `;
    }

    static get properties() {
        return {
            selectedCount: {
                type: Number,
                reflect: true,
                attribute: 'selected-count',
            },
            visible: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    constructor() {
        super();
        this.selectedCount = 0;
    }

    _notify(eventName) {
        this.dispatchEvent(new CustomEvent(eventName));
    }
}

customElements.define(YpPhotoActionsHeader.is, YpPhotoActionsHeader);
