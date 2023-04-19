import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';
import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { minify } from 'html-minifier-terser';
import { Buffer } from 'buffer';
import { Readable } from 'stream';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import * as esbuild from 'esbuild';

const env = process.env.NODE_ENV || 'development';

const stylePath = (filename) =>
  resolve(`${process.cwd()}../../style/${filename}`);

const readStyleFile = (filename) =>
  readFileSync(stylePath(filename)).toString();

const styles = await minify(readStyleFile('style.css'), {
  minifyCSS: true,
  removeComments: true,
  collapseWhitespace: true,
});

function renderApp() {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Web Components Blog">
        <style rel="stylesheet" type="text/css">${styles}</style>
    </head>
    <body> 
      <div id="root"></div>
    <script>
    class MainView extends HTMLElement {
      constructor() {
        super();
        if (!this.shadowRoot) {
          const shadowRoot = this.attachShadow({ mode: 'open' });
          const template = document.createElement('template');
          template.innerHTML = \`
          <style>
          :host {
            display: block;
          }
          .post-container {
            margin-left: var(--padding-sm);
            margin-right: var(--padding-sm);
            padding-bottom: var(--padding-xl);
          }
          </style>
          <div class="post-container">
            <header>
              <h1>Web Component Blog Starter</h1>
            </header>
          </div>\`;
          shadowRoot.appendChild(template.content.cloneNode(true));
        }
      }
    }
    customElements.define('main-view', MainView);
    document.querySelector('#root').appendChild(document.createElement('main-view'));
    </script>
  </body></html>`;
}

export default async (req, res) => {
  const ssrResult = renderApp();
  res.status(200).send(ssrResult);
};
