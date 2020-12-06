import {css, html, LitElement} from 'lit-element';

export class LibLinearProgressIndicator extends LitElement {
    static get is() {
        return 'lib-linear-progress-indicator';
    }

    static get styles() {
        // language=css
        return css`
            @keyframes loading-indeterminate {
                from {
                    transform: translateX(-100%);
                    width: 10px;
                }
                to {
                    width: 75%;
                    transform: translateX(150%);
                }
            }
            
            :host {
                display: flex;
                height: var(--space-micro);
                overflow: hidden;
                background: var(--color-primary-20);
            }
            
            :host([animate][indeterminate]) .indicator {
                animation: loading-indeterminate 1.5s infinite linear;
            }
            
            .indicator {
                height: var(--space-micro);
                background: var(--color-primary-80);
            }
        `;
    }

    render() {
        // language=html
        return html`
            <div class="indicator"></div>
        `;
    }

    static get properties() {
        return {
            // Between 0 and 1
            progress: {
                type: Number,
                reflect: true,
            },
            // If progress is none, this prop is set to true,
            // meaning that completion time is unspecified
            indeterminate: {
                type: Boolean,
                reflect: true,
            },
            animate: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    constructor() {
        super();
        this.indeterminate = true;
    }

    updated(_changedProperties) {
        super.updated(_changedProperties);

        if (_changedProperties.has('progress')) {
            this.indeterminate = Number.isNaN(this.progress);
        }
    }
}

customElements.define(LibLinearProgressIndicator.is, LibLinearProgressIndicator);
