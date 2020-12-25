import {LitElement, html} from 'lit-element';
import '../../common/ui-elements/yp-header';
import '../../common/ui-elements/yp-photo-grid';
import '../../common/ui-elements/yp-photo-actions-header';
import {PhotoDataService} from './photo-data.service';

export class YpHomePage extends LitElement {
    static get is() {
        return 'yp-home-page';
    }

    render() {
        // language=html
        return html`
            <yp-header></yp-header>
            <yp-photo-actions-header
                    ?visible="${this._selectedImages.size > 0}"
                    selected-count="${this._selectedImages.size}"
                    @unselect="${this._onUnselect}"
                    @delete="${this._onDelete}"
                    @add="${this._onAdd}"
                    @download="${this._onDownload}">
            </yp-photo-actions-header>
            <div>
                <yp-photo-grid
                        id="grid"
                        .images="${this._images}"
                        @select="${this._onSelectionChange}"></yp-photo-grid>
            </div>
        `;
    }

    static get properties() {
        return {
            _images: {
                type: Array,
            },
            _selectedImages: {
                type: Set,
            },
        };
    }

    constructor() {
        super();
        this._images = [];
        this._selectedImages = new Set();
    }

    connectedCallback() {
        super.connectedCallback();
        this._getImages();
    }

    _onSelectionChange(event) {
        this._selectedImages = new Set(event.detail.selected);
    }

    _onUnselect() {
        this._gridNode.unselect();
    }

    _onDelete() {
        const ids = Array.from(this._selectedImages)
            .map((imgNode) => imgNode.image.id);
        PhotoDataService.delete(ids)
            .then(console.log)
            .catch(console.error);
    }

    _onAdd() {

    }

    _onDownload() {

    }

    get _gridNode() {
        return this.shadowRoot.getElementById('grid');
    }

    async _getImages() {
        this._images = (await PhotoDataService.getUploadedPhotos()).value.data;
    }
}

customElements.define(YpHomePage.is, YpHomePage);
