import {LitElement, css, html} from 'lit-element';
import 'lit-elem-router';
import './yp-login-page';
import './yp-register-page';
import '../../common/ui-elements/yp-font';
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
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-image: url("/public/app/assets/images/auth-hero.jpg");
                background-size: cover;
            }
            
            .login-form {
                width: min(90%, 400px);
            }
            
            .header {
                color: var(--color-white-80);
                position: absolute;
                left: var(--space-base);
                top: var(--space-small);
            }
        `;
    }

    render() {
        // language=html
        return html`
            <yp-font class="header" type="title-2" font-family="Staatliches">Your photos</yp-font>
            <div class="login-form">
                <lit-router>
                    <lit-route path="${this.routePath}" tag-name="yp-login-page">
                    </lit-route>
                    <lit-route path="${this.routePath}/register" tag-name="yp-register-page">
                    </lit-route>
                </lit-router>
            </div>
        `;
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);

        if (AuthService.instance.isLoggedIn) {
            return Router.navigate('/');
        }
    }

    static get properties() {
        return {
            routePath: {
                type: String,
            },
        };
    }
}

customElements.define(YpAuthPage.is, YpAuthPage);
