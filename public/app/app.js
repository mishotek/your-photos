import {LitElement, html} from 'lit-element';
import './modules/auth/yp-auth-page';
import {Router} from '@vaadin/router/dist/vaadin-router';

export class YpApp extends LitElement {
    static get is() {
        return 'yp-app';
    }

    render() {
        // language=html
        return html`<div id="router-outlet"></div>`;
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this._setUpRouter();
    }

    _setUpRouter() {
        const outlet = this.shadowRoot.getElementById('router-outlet');
        const router = new Router(outlet);
        router.setRoutes([
            {
                path: '/auth',
                component: 'yp-auth-page',
                action: async () => await import('./modules/auth/yp-auth-page'),
            },
            {
                path: '/auth/register',
                component: 'yp-auth-page',
                action: async () => await import('./modules/auth/yp-auth-page'),
            },
        ]);
    }
}

window.customElements.define(YpApp.is, YpApp);
