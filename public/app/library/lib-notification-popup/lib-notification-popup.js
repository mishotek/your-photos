import {css, html, LitElement} from 'lit-element';

export class LibNotificationPopup extends LitElement {
    static get is() {
        return 'lib-notification-popup';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                position: fixed;
                left: var(--popup-left, var(--space-large));
                bottom: var(--popup-bottom, var(--space-s-large));
                transform: translateY(200%);
                opacity: 0;
                
                will-change: transform, opacity;
                transition: transform 0.5s ease-in-out, opacity 0.3s linear;
                z-index: 1;
            }
            
            :host([active]) {
                transform: translateY(0);
                opacity: 1;
            }
        `;
    }

    render() {
        // language=html
        return html`<slot></slot>`;
    }

    static get properties() {
        return {
            active: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    show() {
        this.active = true;
    }

    hide() {
        this.active = false;
    }
}

customElements.define(LibNotificationPopup.is, LibNotificationPopup);
