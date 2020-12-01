import {LitElement, html} from 'lit-element';
import 'lit-elem-router';
import {AuthService} from './modules/auth/auth.service';
import {AuthStorage} from './modules/auth/auth.storage';

export class YpApp extends LitElement {
    static get is() {
        return 'yp-app';
    }

    render() {
        // language=html
        return html`
            <lit-router>
                <lit-route path="/">
                    root
                </lit-route>
                <lit-route path="/:auth" @activate="${this._loadAuthModule}">
                    <yp-auth-page></yp-auth-page>
                </lit-route>
            </lit-router>
        `;
    }

    constructor() {
        super();
        this._goToHash();
        this._subscribeToLogout();
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
    }

    _goToHash() {
        const hasHash = !!window.location.hash;
        if (!hasHash) {
            window.location.href = '/#/';
        }
    }

    _loadAuthModule() {
        import('./modules/auth/yp-auth-page');
    }

    _subscribeToLogout() {
        const authService = AuthService.instance;
        authService.onLogout(() => {
            window.location.href = '/#/auth';
        });

        const shouldLogOut = !AuthStorage.getAccessToken();
        if (shouldLogOut) {
            authService.logout();
        }
    }
}

window.customElements.define(YpApp.is, YpApp);
