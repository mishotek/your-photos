import {LitElement, html, css} from 'lit-element';
import {unsafeSVG} from 'lit-html/directives/unsafe-svg';

export class LibIcon extends LitElement {
    static get is() {
        return 'lib-icon';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: inline-flex;
            }
            
            :host svg {
                height: var(--size, 24px);
                width: var(--size, 24px);
            }
        `;
    }

    render() {
        // language=html
        return html`${unsafeSVG(this._iconStr)}`;
    }

    static get properties() {
        return {
            icon: {
                type: String,
                reflect: true,
            },
            size: {
                type: String,
                reflect: true,
            },
            _iconStr: {
                type: String,
            },
        };
    }

    constructor() {
        super();
        this.icon = '';
        this.size = '24';
        this._icons = new Map();
    }

    updated(_changedProperties) {
        super.updated(_changedProperties);
        if (this.icon) {
            this._getIconStr(this.icon)
                .then((iconStr) => this._iconStr = iconStr);
        }
    }

    async _getIconStr() {
        const fileName =`ic_${this.icon}_${this.size}px.svg`;
        if (this._icons.has(fileName)) {
            return this._icons.get(fileName);
        }

        const str = await this._fetchIcon(fileName);
        if (str) {
            this._icons.set(fileName, str);
        }
        return str;
    }

    async _fetchIcon(fileName) {
        try {
            return (await fetch(`http://localhost:8000/public/icons/${fileName}`)).text();
        } catch (e) {
            console.error(e);
            return '';
        }
    }
}

customElements.define(LibIcon.is, LibIcon);
