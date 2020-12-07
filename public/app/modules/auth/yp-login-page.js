import {css, html, LitElement} from 'lit-element';
import '../../common/form-elements/yp-button';
import '../../common/form-elements/yp-text-field';
import '../../common/ui-elements/yp-font';
import {DataService} from '../../utils/data.service';
import {AUTH_LOGIN} from '../../utils/XHR';
import {AuthService} from "./auth.service";

export class YpLoginPage extends LitElement {
    static get is() {
        return 'yp-login-page';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: flex;
                flex-direction: column;
                border-radius: var(--radius-base);
                border: solid 1px var(--color-black-30);
                background-color: var(--color-white-80);
                box-shadow: var(--shadow-40);
                padding: var(--space-large) var(--space-s-large) var(--space-s-large);
            }
            
            .title {
                margin-bottom: var(--space-base);
            }
            
            .actions {
                display: flex;
                justify-content: flex-end;
            }
            
            .register {
                margin-right: var(--space-small);
            }
        `;
    }

    render() {
        // language=html
        return html`
            <yp-font class="title" type="title-2" font-family="Staatliches">Log in</yp-font>

            <yp-text-field label="Username"
                           ?error="${this._error}"
                           @onchange="${this._onUsernameChange}"></yp-text-field>
            <yp-text-field label="Password"
                           type="password"
                           message="${this._error ? 'Wrong username or password' : ''}"
                           ?error="${this._error}"
                           @onchange="${this._onPasswordChange}"></yp-text-field>
            
            <div class="actions">
                <yp-button type="link" class="register" href="/auth/register">
                   Register
                </yp-button>
                <yp-button type="contained" @click="${this._submit}">Sign in</yp-button>
            </div>
        `;
    }

    static get properties() {
        return {
            _username: {
                type: String,
            },
            _password: {
                type: String,
            },
            _error: {
                type: Boolean,
            },
        };
    }

    constructor() {
        super();
        this._authService = AuthService.instance;
    }

    _onUsernameChange(event) {
        this._username = event.detail.value;
    }

    _onPasswordChange(event) {
        this._password = event.detail.value;
    }

    async _submit() {
        const {value, status} = await DataService.post(AUTH_LOGIN, JSON.stringify({
            username: this._username,
            password: this._password,
        }), {'Content-Type': 'application/json'});

        if (status === 200) {
            this._error = false;
            this._authenticate(value.data);
        } else {
            this._error = true;
        }
    }

    _authenticate(data) {
        this._authService.login(data.accessToken, data.user);
        window.location.href = '/#/';
    }
}

customElements.define(YpLoginPage.is, YpLoginPage);
