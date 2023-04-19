import { html, css, joinTemplates } from '../../util/template.js';
import { Meta, Post } from '../../../../server/src/db/index.js';

export type DataModel = {
  meta: Meta;
  posts: Array<Post>;
};

const styles = css`
  :host {
    display: block;
  }
  .post-container {
    padding-bottom: var(--padding-xl);
  }
  a:link,
  a:visited {
    color: var(--color-blue-700);
    text-decoration: none;
  }
  @media (max-width: 720px) {
    .post-container {
      margin-left: var(--padding-sm);
      margin-right: var(--padding-sm);
    }
    app-card {
      margin-bottom: var(--margin-md);
    }
  }
  @media (min-width: 721px) {
    .post-container {
      width: 720px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      padding-left: var(--padding-lg);
      padding-right: var(--padding-lg);
    }
    app-card {
      margin-bottom: var(--margin-lg);
    }
  }
`;

class MainView extends HTMLElement {
  constructor() {
    super();
    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      const template = document.createElement('template');
      template.innerHTML = `
      <style>
       ${styles}
      </style>
      <div class="post-container">
        <app-header></app-header>
      </div>
      `;
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}
customElements.define('main-view', MainView);

export { MainView };
