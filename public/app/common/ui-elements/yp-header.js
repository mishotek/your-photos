import {css, html, LitElement} from 'lit-element';
import '../form-elements/yp-button';
import '../ui-elements/yp-font';
import '../../library/lib-icon/lib-icon';
import '../ui-elements/yp-uploading-notification';
import {PhotoDataService} from '../../modules/home/photo-data.service';

export class YpHeader extends LitElement {
    static get is() {
        return 'yp-header';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: block;
            }
            
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: var(--space-x-large);
                border-bottom: solid 1px var(--color-black-10);
                padding: 0 var(--space-base);
            }
            
            .logo {
                color: var(--color-black-50);
                padding: var(--space-tiny);
                cursor: pointer;
                margin-left: calc(-1 * var(--space-tiny));
            }
            
            .logo__color:nth-child(1) {
                color: var(--color-logo-blue);
            }

            .logo__color:nth-child(2) {
                color: var(--color-logo-red);
            }

            .logo__color:nth-child(3) {
                color: var(--color-logo-yellow);
            }

            .logo__color:nth-child(4) {
                color: var(--color-logo-green);
            }
            
            .upload__wrapper {
                position: relative;
                overflow: hidden;
            }
            
            .upload__input {
                position: absolute;
                left: 0;
                top: 0;
                height: var(--space-large);
                opacity: 0;
                cursor: pointer;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <header class="header">
                <div class="left align-center">
                    <a href="/">
                        <yp-font class="logo" type="large" bold>
                            <span class="logo__color">Y</span><span class="logo__color">o</span><span class="logo__color">u</span><span class="logo__color">r</span>
                            Photos
                        </yp-font>
                    </a>
                    <a href="/auth">login</a>
                    <a href="/auth/register">register</a>
                </div>
                <div class="right align-center">
                    <div class="upload__wrapper">
                        <input class="upload__input"
                               multiple
                               type="file"
                               accept="image/*"
                               @change="${this._onFileSelection}">
                        <yp-button type="text" icon="add_a_photo">Upload</yp-button>
                    </div>
                </div>
            </header>
            
            <yp-uploading-notification
                id="progress"
                img-url="${this._previewImg}"
                img-count="${this._photoCount}"></yp-uploading-notification>
        `;
    }

    static get properties() {
        return {
            _photoCount: {
                type: Number,
            },
            _previewImg: {
                type: String,
            },
        };
    }

    async _onFileSelection(event) {
        const files = event.target.files;
        if (files.length === 0) return;

        this._photoCount = files.length;
        this._previewImg = URL.createObjectURL(files[0]);
        this._progress.show();

        try {
            await PhotoDataService.upload(files);
            this._progress.showSuccess();
        } catch (e) {
            console.error(e);
            this._progress.showError();
        }

        setTimeout(() => this._progress.hide(), 1500);
    }

    get _progress() {
        return this.shadowRoot.getElementById('progress');
    }
}

customElements.define(YpHeader.is, YpHeader);
