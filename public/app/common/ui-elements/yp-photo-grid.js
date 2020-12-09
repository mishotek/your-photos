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
        };
    }

    constructor() {
        super();
        this.images = [];
    }
}

customElements.define(YpPhotoGrid.is, YpPhotoGrid);
