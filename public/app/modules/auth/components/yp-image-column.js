import {LitElement, css, html} from 'lit-element';

export class YpImageColumn extends LitElement {
    static get is() {
        return 'yp-image-column';
    }

    static get styles() {
        // language=css
        return css`
            @keyframes move-col-1-phase-1 {
                from { transform: translateY(0); }
                to { transform: translateY(-100%); }
            }

            @keyframes move-col-1-phase-2 {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }

            @keyframes move-col-2-phase-1 {
                from { transform: translateY(0); }
                to { transform: translateY(-100%); }
            }

            @keyframes move-col-2-phase-2 {
                from { transform: translateY(-100%); }
                to { transform: translateY(-200%); }
            }
            
            :host {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100vh;
                overflow: hidden;
            }
            
            :host([reverse-animation]) .img-col {
                animation-direction: reverse;
            }
            
            :host([phase-one]) .col-1 {
                animation-name: move-col-1-phase-1;
            }

            :host([phase-one]) .col-2 {
                animation-name: move-col-2-phase-1;
            }
            
            :host(:not([phase-one])) .col-1 {
                animation-name: move-col-1-phase-2;
            }

            :host(:not([phase-one])) .col-2 {
                animation-name: move-col-2-phase-2;
            }
            
            .img-col {
                display: flex;
                flex-direction: column;
                width: 100%;
                animation-duration: 60s;
                animation-timing-function: linear;
            }
            
            .img-slot::slotted(img),
            .col-2 > img {
                width: 100%;
                margin-bottom: var(--space-tiny);
                filter: saturate(0) brightness(0.8);
            }
        `;
    }

    render() {
        // language=html
        return html`
            <div class="img-col col-1">
                <slot class="img-slot" @slotchange="${this._onSlotChange}"></slot>
            </div>
            <div class="img-col col-2"></div>
        `;
    }

    static get properties() {
        return {
            reverseAnimation: {
                type: Boolean,
                reflect: true,
                attribute: 'reverse-animation',
            },
            phaseOne: {
                type: Boolean,
                reflect: true,
                attribute: 'phase-one',
            },
        };
    }

    constructor() {
        super();
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);

        this.phaseOne = true;
        this._startInterval();
    }

    _startInterval() {
        setInterval(() => {
            this.phaseOne = !this.phaseOne;
        }, 60000);
    }

    _onSlotChange(event) {
        const images = event.target.assignedNodes();
        const cloneWrapperNode = this.shadowRoot.querySelector('.col-2');
        this._clearClonedImages(cloneWrapperNode);
        this._cloneImages(cloneWrapperNode, images);
    }

    _clearClonedImages(node) {
        while (node.firstChild) {
            node.removeChild(node.lastChild);
        }
    }

    _cloneImages(node, images) {
        for (const image of images) {
            node.appendChild(image.cloneNode());
        }
    }
}

customElements.define(YpImageColumn.is, YpImageColumn);
