import {LitElement, css, html} from 'lit-element';
import '../../../common/form-elements/yp-text-field';
import '../../../common/form-elements/yp-button';
import '../../../common/ui-elements/yp-font';

export class YpLoginForm extends LitElement {
    static get is() {
        return 'yp-login-form';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: flex;
                flex-direction: column;
                padding: var(--space-large) var(--space-s-large) var(--space-s-large);
                border-radius: var(--radius-base);
                border: solid 1px var(--color-black-30);
                background-color: var(--color-white-80);
                box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
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

            <yp-text-field label="Username"></yp-text-field>
            <yp-text-field label="Password"></yp-text-field>
            
            <div class="actions">
                <yp-button type="outlined" class="register">Register</yp-button>
                <yp-button type="contained">Sign in</yp-button>
            </div>
        `;
    }

    static get properties() {
        return {};
    }
}

customElements.define(YpLoginForm.is, YpLoginForm);
