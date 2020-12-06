import {LitElement, html} from 'lit-element';
import 'lit-elem-router';
import {AuthService} from './modules/auth/auth.service';
import {AuthStorage} from './modules/auth/auth.storage';
import {Router} from 'lit-elem-router/public/router';

export class YpApp extends LitElement {
    static get is() {
        return 'yp-app';
    }

    render() {
        // language=html
        return html`
            <lit-router>
                <lit-route path="/"
                           tag-name="yp-home-page"
                           @activate="${this._loadHomeModule}">
                </lit-route>
                <lit-route path="/:auth"
                           tag-name="yp-auth-page"
                           @activate="${this._loadAuthModule}">
                </lit-route>
            </lit-router>
        `;
    }

    constructor() {
        super();
        this._subscribeToLogout();
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
    }

    _loadAuthModule() {
        import('./modules/auth/yp-auth-page');
    }

    _loadHomeModule() {
        import('./modules/home/yp-home-page');
    }

    _subscribeToLogout() {
        const authService = AuthService.instance;
        authService.onLogout(() => {
            Router.navigate('/auth');
        });

        const shouldLogOut = !AuthStorage.getAccessToken();
        if (shouldLogOut) {
            authService.logout();
        }
    }
}

window.customElements.define(YpApp.is, YpApp);
