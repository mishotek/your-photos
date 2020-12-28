import {css, html, LitElement} from 'lit-element';
import './yp-photo-grid-item';

export class YpPhotoGrid extends LitElement {
    static get is() {
        return 'yp-photo-grid';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: flex;
                flex-wrap: wrap;
                
                --img-height: 200px;
            }
            
            .img__wrapper {
                flex-grow: 1;
                margin: var(--space-x-micro);
                background-color: var(--color-black-10);
                height: var(--img-height);
            }
            
            .img {
                height: var(--img-height);
                object-fit: cover;
                max-width: 100%;
                min-width: 100%;
                vertical-align: bottom;
            }
        `;
    }

    render() {
        // language=html
        return this.images.map((img) => html`
            <div class="img__wrapper">
                <yp-photo-grid-item
                        @selection-change="${this._selectionChanged}"
                        class="img"
                        .image="${img}">
                </yp-photo-grid-item>
            </div>
        `);
    }

    static get properties() {
        return {
            images: {
                type: Array,
            },
            _selected: {
                type: Set,
            },
        };
    }

    constructor() {
        super();
        this.images = [];
        this._selected = new Set();
    }

    unselect() {
        for (const node of this.shadowRoot.querySelectorAll('.img')) {
            node.selected = false;
        }
        this._selected = new Set();
        this._notifySelectionChange();
    }

    _selectionChanged(event) {
        const {selected, image} = event.detail;
        if (selected) {
            this._selected.add(image);
        } else {
            this._selected.delete(image);
        }

        this._notifySelectionChange();
    }

    _notifySelectionChange() {
        this.dispatchEvent(new CustomEvent('select', {detail: {
            selected: this._selected,
        }}));
    }
}

customElements.define(YpPhotoGrid.is, YpPhotoGrid);
