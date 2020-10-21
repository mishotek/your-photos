import {LitElement, html} from 'lit-element';
import './common/form-elements/yp-text-field';
import './common/form-elements/yp-button';

export class YpApp extends LitElement {
    static get is() {
        return 'yp-app';
    }

    render() {
        // language=html
        return html`
            <yp-text-field style="margin: 24px 24px 0 24px; width: 300px;"
                           label="Email"
                           message="Password is incorrect. Try again or click again or click 'reset password'. Password is incorrect. Try again or click 'reset password'">
            </yp-text-field>

            <yp-text-field style="margin: 0 24px; width: 300px;"
                           error
                           label="Email"
                           message="Password is incorrect. Try again or click again or click 'reset password'. Password is incorrect. Try again or click 'reset password'">
            </yp-text-field>

            <yp-text-field style="margin: 0 24px; width: 300px;"
                           success
                           label="Email"
                           message="Password is incorrect. Try again or click again or click 'reset password'. Password is incorrect. Try again or click 'reset password'">
            </yp-text-field>
            
            <yp-button size="small" style="margin: 24px">
                Register
            </yp-button>
        `;
    }
}

window.customElements.define(YpApp.is, YpApp);
