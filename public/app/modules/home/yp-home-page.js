import {LitElement, html} from 'lit-element';
import '../../common/ui-elements/yp-header';
import '../../common/ui-elements/yp-photo-grid';
import {PhotoDataService} from './photo-data.service';

export class YpHomePage extends LitElement {
    static get is() {
        return 'yp-home-page';
    }

    render() {
        // language=html
        return html`
            <yp-header></yp-header>
            <div>
                <yp-photo-grid .images="${this._images}"></yp-photo-grid>
            </div>
        `;
    }

    static get properties() {
        return {
            _images: {
                type: Array,
            },
        };
    }

    constructor() {
        super();
        this._images = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this._getImages();
    }

    async _getImages() {
        this._images = (await PhotoDataService.getUploadedPhotos()).value.data;
    }
}

customElements.define(YpHomePage.is, YpHomePage);
