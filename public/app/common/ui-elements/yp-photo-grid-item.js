import {css, html, LitElement} from 'lit-element';
import '../../library/form-elements/inputs/lib-checkbox/lib-checkbox';

export class YpPhotoGridItem extends LitElement {
    static get is() {
        return 'yp-photo-grid-item';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: flex;
                position: relative;
                cursor: pointer;
                background: var(--color-secondary-10);
            }

            :host::after {
                display: block;
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                background: linear-gradient(180deg, rgba(0,0,0,0.67) 0%, rgba(0,0,0,0) 52%);
                opacity: 0;
                
                will-change: opacity;
                transition: opacity 0.1s;
            }
            
            :host(:not([selected]):hover)::after {
                opacity: 1;
            }
            
            :host(:hover) .checkbox {
                opacity: 0.6;
            }

            :host([selected]) .checkbox,
            :host(:not([selected])) .checkbox:hover {
                opacity: 1;
            }
            
            :host([selected]) .img {
                transform: scale(0.8);
            }

            .img {
                height: var(--img-height);
                object-fit: cover;
                max-width: 100%;
                min-width: 100%;
                vertical-align: bottom;
                
                will-change: transform;
                transition: transform 0.3s ease-in-out;
            }
            
            .checkbox {
                position: absolute;
                left: var(--space-micro);
                top: var(--space-micro);
                z-index: 1;
                opacity: 0;
                
                will-change: opacity;
                transition: opacity 0.1s;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <lib-checkbox
                    class="checkbox"
                    ?value="${this.selected}"
                    @value-change="${this.toggle}"></lib-checkbox>
            <img class="img" src="${this.image.url}" alt="">
        `;
    }

    static get properties() {
        return {
            image: {
                type: Object,
            },
            selected: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    constructor() {
        super();
    }

    toggle() {
        this.selected = !this.selected;
        this._notifySelectionChange();
    }

    _notifySelectionChange() {
        this.dispatchEvent(new CustomEvent('selection-change', {
            detail: {
                selected: this.selected,
                image: this.image,
            },
        }));
    }
}

customElements.define(YpPhotoGridItem.is, YpPhotoGridItem);
