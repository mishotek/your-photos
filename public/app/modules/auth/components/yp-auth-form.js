import {LitElement, css, html} from 'lit-element';
import './yp-login-form';

export class YpAuthForm extends LitElement {
    static get is() {
        return 'yp-auth-form';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: flex;
                border-radius: var(--radius-base);
                border: solid 1px var(--color-black-30);
                background-color: var(--color-white-80);
                box-shadow: var(--shadow-40);
                overflow: hidden;
                position: relative;
            }

            :host([registering]) .register-form {
                transform: translateX(0);
            }

            :host([registering]) .login-form {
                transform: translateX(-100%);
            }

            .register-form {
                position: absolute;
                transform: translateX(100%);
            }
            
            .login-form,
            .register-form {
                will-change: transform;
                transition: transform 0.3s ease-in-out;
            }
        `;
    }

    render() {
        // language=html
        return html`                
            <yp-login-form class="login-form"
                           @register="${this._goToRegister}"></yp-login-form>
            <yp-login-form class="register-form"></yp-login-form>
        `;
    }

    static get properties() {
        return {
            registering: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    _goToRegister() {
        this.registering = true;
    }
}

customElements.define(YpAuthForm.is, YpAuthForm);
