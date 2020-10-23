import {LitElement, css, html} from 'lit-element';
import './components/yp-image-column';
import './components/yp-login-form';

export class YpAuthPage extends LitElement {
    static get is() {
        return 'yp-auth-page';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: flex;
                height: 100vh;
                overflow: hidden;
                position: relative;
                align-items: center;
                justify-content: center;
            }
            
            .grid {
                display: grid;
                box-sizing: border-box;
                width: 100%;
                grid-column-gap: var(--space-tiny);
                padding: 0 var(--space-tiny);
            }
            
            .login-form {
                position: absolute;
                width: 100%;
                max-width: 500px;
                padding: var(--space-base);
                box-sizing: border-box;
            }

            /* Extra small devices (phones, 600px and down) */
            @media only screen and (max-width: 600px) {
                .grid {
                    grid-template-columns: repeat(3, 1fr);
                }
            }

            /* Small devices (portrait tablets and large phones, 600px and up) */
            @media only screen and (min-width: 600px) {
                .grid {
                    grid-template-columns: repeat(4, 1fr);
                }
            }

            /* Medium devices (landscape tablets, 768px and up) */
            @media only screen and (min-width: 768px) {
                .grid {
                    grid-template-columns: repeat(5, 1fr);
                }
            }

            /* Large devices (laptops/desktops, 992px and up) */
            @media only screen and (min-width: 992px) {
                .grid {
                    grid-template-columns: repeat(6, 1fr);
                }
            }

            /* Extra large devices (large laptops and desktops, 1200px and up) */
            @media only screen and (min-width: 1200px) {
                .grid {
                    grid-template-columns: repeat(8, 1fr);
                }
            }
        `;
    }

    render() {
        // language=html
        return html`
            <div class="grid">
                ${this._columns.map((colIndex) => html`
                    <yp-image-column class="grid-col" reverse-animation>
                        ${this._rows.map(() => html`
                            <img src="/public/app/assets/images/landing/${this._imageName}"/> 
                        `)}
                    </yp-image-column>
                `)}
            </div>
            
            <div class="login-form">
                <yp-login-form></yp-login-form>
            </div>
        `;
    }

    constructor() {
        super();
        this._columns = [1, 2, 3, 4, 5, 6, 7, 8];
        this._rows = [1, 2, 3, 4, 5, 6, 7, 8];
    }

    static get properties() {
        return {
            _columns: {
                type: Array,
            },
            _rows: {
                type: Array,
            },
        };
    }

    get _imageName() {
        return `${Math.ceil(Math.random() * 30)}.jpg`;
    }
}

customElements.define(YpAuthPage.is, YpAuthPage);
