import {LitElement, html, css} from 'lit-element';

export class YpRegisterPage extends LitElement {
    static get is() {
        return 'yp-register-page';
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
            
            .login {
                margin-right: var(--space-small);
            }
        `;
    }

    render() {
        // language=html
        return html`
            <yp-font class="title" type="title-2" font-family="Staatliches">Register</yp-font>

            <yp-text-field label="Username"
                           ?error="${this._error}"
                           @onchange="${this._onUsernameChange}"></yp-text-field>
            <yp-text-field label="Password"
                           message="${this._error ? 'Wrong username or password' : ''}"
                           ?error="${this._error}"
                           @onchange="${this._onPasswordChange}"></yp-text-field>
            
            <div class="actions">
                <yp-button type="link" class="login" href="/auth">
                   Login
                </yp-button>
                <yp-button type="contained" @click="${this._submit}">Sign up</yp-button>
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

    _onUsernameChange(event) {
        this._username = event.detail.value;
    }

    _onPasswordChange(event) {
        this._password = event.detail.value;
    }

    async _submit() {
        // const {value, status} = await DataService.post(AUTH_LOGIN, {
        //     username: this._username,
        //     password: this._password,
        // });
        //
        // if (status === 200) {
        //     this._error = false;
        //     this._authenticate(value.data);
        // } else {
        //     this._error = true;
        // }
    }

    _authenticate(data) {
        console.log(data);
    }
}

customElements.define(YpRegisterPage.is, YpRegisterPage);
