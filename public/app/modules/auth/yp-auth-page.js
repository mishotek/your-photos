import {LitElement, css, html} from 'lit-element';
import './components/yp-image-column';
import 'lit-elem-router';
import './yp-login-page';
import './yp-register-page';
import {AuthService} from './auth.service';
import {Router} from 'lit-elem-router/public/router';

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
            }
            
            .grid {
                display: grid;
                box-sizing: border-box;
                width: 100%;
                grid-column-gap: var(--space-tiny);
                padding: 0 var(--space-tiny);
            }
            
            .content {
                position: absolute;
                height: 100vh;
                width: 100vw;
                display: grid;
                place-content: center;
            }
            
            .login-form {
                width: clamp(300px, 50vw, 400px);
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
            
            <div class="content">
                <div class="login-form">
                    <lit-router>
                        <lit-route path="${this.routePath}" tag-name="yp-login-page">
                        </lit-route>
                        <lit-route path="${this.routePath}/register" tag-name="yp-register-page">
                        </lit-route>
                    </lit-router>
                </div>
            </div>
        `;
    }

    constructor() {
        super();

        this._columns = [1, 2, 3, 4, 5, 6, 7, 8];
        this._rows = [1, 2, 3, 4, 5, 6, 7, 8];
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);

        if (AuthService.instance.isLoggedIn) {
            return Router.navigate('/');
        }
    }

    static get properties() {
        return {
            _columns: {
                type: Array,
            },
            _rows: {
                type: Array,
            },
            routePath: {
                type: String,
            },
        };
    }

    get _imageName() {
        return `${Math.ceil(Math.random() * 30)}.jpg`;
    }
}

customElements.define(YpAuthPage.is, YpAuthPage);
