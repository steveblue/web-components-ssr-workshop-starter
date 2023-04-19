import { html, css } from '../../util/template.js';

const styles = css`
  :host {
    display: block;
    background: var(--color-white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-dialog);
    overflow: hidden;
  }
  ::slotted(*) {
    padding-left: var(--padding-lg);
    padding-right: var(--padding-lg);
  }
  ::slotted(a:link),
  ::slotted(a:visited) {
    display: block;
  }
  ::slotted(:last-child) {
    padding-bottom: var(--margin-lg);
  }
  ::slotted(img) {
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

class AppCard extends HTMLElement {
  constructor() {
    super();
    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      const template = document.createElement('template');
      template.innerHTML = `
      <style>
      ${styles}
      </style>
      <header>
        <slot name="header"></slot>
      </header>
      <section>
        <slot name="content"></slot>
      </section>
      <footer>
        <slot name="footer"></slot>
      </footer>
      `;
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}

customElements.define('app-card', AppCard);

export { styles, AppCard };
