import {css, html, LitElement} from 'lit-element';
import '../../library/lib-notification-popup/lib-notification-popup';
import '../ui-elements/yp-font';
import {ifDefined} from 'lit-html/directives/if-defined';
import '../../library/lib-linear-progress-indicator/lib-linear-progress-indicator';
import '../../library/lib-icon/lib-icon';

export class YpUploadingNotification extends LitElement {
    static get is() {
        return 'yp-uploading-notification';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: inline-block;
                position: relative;
            }

            :host([success]) .result,
            :host([error]) .result {
                pointer-events: all;
                opacity: 1;
            }

            :host([success]) .result-icon-wrapper,
            :host([error]) .result-icon-wrapper {
                transform: rotate(0);
            }
            
            :host([success]) .result {
                background: var(--color-success-50);
            }

            :host([success]) .result-icon {
                fill: var(--color-success-80);
            }
            
            :host([error]) .result {
                background: var(--color-error-50);
            }

            :host([error]) .result-icon {
                fill: var(--color-error-80);
            }
            
            .result {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                content: '';
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                background: transparent;
                border-radius: var(--radius-large);
                pointer-events: none;
                opacity: 0;
                
                will-change: background, opacity;
                transition: background 0.2s ease-in-out, opacity 0.2s ease-in-out;
            }
            
            .result-icon-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                height: var(--space-large);
                width: var(--space-large);
                border-radius: var(--radius-circle);
                background: var(--color-white-80);
                transform: rotate(-45deg);
                
                will-change: transform;
                transition: transform 0.4s ease-in-out;
            }
            
            .popup {
                display: inline-flex;
                border-radius: var(--radius-large);
                background: var(--color-white-80);
                box-shadow: var(--shadow-30);
                overflow: hidden;
                height: var(--space-xx-large);
            }
            
            .img {
                width: var(--space-xx-large);
                height: var(--space-xx-large);
                background-position: center center;
                background-size: cover;
            }
            
            .content {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-width: 200px;
            }
            
            .titles {
                display: flex;
                flex-direction: column;
            }
            
            .subtitle {
                color: var(--color-black-40);
                margin: var(--space-x-small) var(--space-base) 0;
            }
            
            .title {
                color: var(--color-black-60);
                margin: 0 var(--space-base);
            }
        `;
    }

    render() {
        // language=html
        return html`
            <lib-notification-popup id="popup">
                <div class="popup">
                    <div class="result">
                        <div class="result-icon-wrapper">
                            <lib-icon class="result-icon"
                                      icon="${this.success ? 'done' : 'close'}"></lib-icon>
                        </div>
                    </div>
                
                    <div class="img"
                         style="background-image: url(${ifDefined(this.imgUrl)})">
                    </div>
                    <div class="content">
                        <div class="titles">
                            <yp-font class="subtitle"
                                     type="micro"
                                     bold>
                                 Uploading to
                             </yp-font>
                            <yp-font class="title"
                                     type="regular"
                                     bold>
                                 Your drive
                             </yp-font>
                            <yp-font class="subtitle"
                                     type="micro"
                                     bold>
                                ${this.imgCount} images
                            </yp-font>
                        </div>
                        <lib-linear-progress-indicator id="progress">
                        </lib-linear-progress-indicator>
                    </div>
                </div>
            </lib-notification-popup>
        `;
    }

    static get properties() {
        return {
            imgUrl: {
                type: String,
                reflect: true,
                attribute: 'img-url',
            },
            imgCount: {
                type: String,
                reflect: true,
                attribute: 'img-count',
            },
            error: {
                type: Boolean,
                reflect: true,
            },
            success: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    show() {
        this._popup.show();
        setTimeout(() => this._progress.animate = true, 600);
    }

    showSuccess() {
        this.error = false;
        this.success = true;
        this._progress.animate = false;
    }

    showError() {
        this.error = true;
        this.success = false;
        this._progress.animate = false;
    }

    hide() {
        this._progress.animate = false;
        this._popup.hide();
        setTimeout(() => {
            this.error = false;
            this.success = false;
        }, 1000);
    }

    get _progress() {
        return this.shadowRoot.getElementById('progress');
    }

    get _popup() {
        return this.shadowRoot.getElementById('popup');
    }
}

customElements.define(YpUploadingNotification.is, YpUploadingNotification);
