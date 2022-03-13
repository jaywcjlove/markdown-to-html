Convert Markdown to HTML.
===

[![CI](https://github.com/jaywcjlove/markdown-to-html/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/markdown-to-html/actions/workflows/ci.yml)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/npm/@wcj/markdown-to-html/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@wcj/markdown-to-html)
[![npm version](https://img.shields.io/npm/v/@wcj/markdown-to-html.svg)](https://www.npmjs.com/package/@wcj/markdown-to-html)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@wcj/markdown-to-html/file/README.md)

Converts markdown text to HTML.

## Install

```bash
$ npm i @wcj/markdown-to-html
```

## Usage

```js
import markdown from '@wcj/markdown-to-html';

markdown('# Markdown String')
// => <h1>Markdown String</h1>
```

Or manually download and link `markdown-to-html` in your HTML, It can also be downloaded via [UNPKG](https://unpkg.com/browse/@wcj/markdown-to-html/):

CDN: [UNPKG](https://unpkg.com/@wcj/markdown-to-html/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/@wcj/markdown-to-html/) | [Githack](https://raw.githack.com/jaywcjlove/markdown-to-html/gh-pages/markdown.min.js) | [Statically](https://cdn.statically.io/gh/jaywcjlove/markdown-to-html/gh-pages/markdown.min.js)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css">
<link rel="stylesheet" href="https://unpkg.com/@wcj/markdown-to-html/dist/marked.css">

<script src="https://unpkg.com/@wcj/markdown-to-html/dist/markdown.min.js"></script>
<script type="text/javascript">
  ;(() => {
    const str = '# Markdown to HTML\n\nConverts markdown text to HTML.\n\n';
    const div = document.createElement('div');
    div.className = 'markdown-body';
    div.innerHTML = markdown(str)
    document.body.appendChild(div)
  })()
</script>
```

## API

```ts
import { PluggableList } from 'unified';
import { Options as RemarkRehypeOptions } from 'remark-rehype';
import { RehypeRewriteOptions } from 'rehype-rewrite';
export interface Options {
  /** [remark-rehype](https://github.com/remarkjs/remark-rehype) options */
  remarkRehypeOptions?: RemarkRehypeOptions;
  /** List of [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins) to use. See the next section for examples on how to pass options */
  remarkPlugins?: PluggableList;
  /** List of [rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins) to use. See the next section for examples on how to pass options */
  rehypePlugins?: PluggableList;
  /** Resulting Node tree. */
  hastNode?: boolean;
  /** Rewrite Element. [rehype-rewrite](https://github.com/jaywcjlove/rehype-rewrite#rewritenode-index-parent-void) */
  rewrite?: RehypeRewriteOptions['rewrite'];
}
export default function markdown(markdownStr?: string, options?: Options): string | import("hast").Root;
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/markdown-to-html/graphs/contributors">
  <img src="https://jaywcjlove.github.io/markdown-to-html/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
