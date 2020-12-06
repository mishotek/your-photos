import {css, html, LitElement} from 'lit-element';

export class YpPhotoGrid extends LitElement {
    static get is() {
        return 'yp-photo-grid';
    }

    static get styles() {
        // language=css
        return css``;
    }

    render() {
        // language=html
        return html``;
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
