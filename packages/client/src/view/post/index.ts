import { Octokit } from '@octokit/core';
import { html, css } from '../../util/template.js';
import { Meta, Post } from '../../../../server/src/db/index.js';

const octokit = new Octokit({
  auth: `{{github_token}}`,
});

export type DataModel = {
  meta: Meta;
  post: Post;
  html: any;
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
      width: 100%;
    }
    .post-content {
      padding-left: var(--padding-sm);
      padding-right: var(--padding-sm);
      margin-bottom: var(--margin-xl);
    }
  }
  @media (min-width: 721px) {
    .post-container {
      width: 720px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .post-content {
      padding-left: var(--padding-lg);
      padding-right: var(--padding-lg);
      margin-bottom: var(--margin-xl);
    }
  }
`;

class PostView extends HTMLElement {
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
        <div class="post-content">
          <h2>Author: </h2>
          <footer>
            <a href="/">👈 Back</a>
          </footer>
        </div>
      </div>`;
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}
customElements.define('post-view', PostView);

export { PostView };
