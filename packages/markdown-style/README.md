markdown-style
===

Integrate markdown styles into web components, Markdown CSS styles will not be conflicted. The minimal amount of CSS to replicate the GitHub Markdown style. Support dark-mode/night mode.

## Installation

```bash
npm install --save markdown-style
```

Or load the ES module directly through unpkg

unpkg.com CDN:

```html
<script type="module" src="https://unpkg.com/@uiw/github-corners?module"></script>
```

Skypack CDN:

```html
<script type="module" src="https://cdn.skypack.dev/@uiw/github-corners"></script>
```

## Usage

Use it in your HTML:

```html
<markdown-style>
  <!-- markdown html is here -->
  <h1>Markdown HTML</h1>
</markdown-style>
```

Learn about web components [here](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

Using web components in React:

```jsx
import React from 'react';
import 'markdown-style';

function Demo() {
  return (
    <markdown-style>
      <h1>Markdown Style</h1>
    </markdown-style>
  );
}
```

```html
<script src="https://unpkg.com/@wcj/markdown-to-html/dist/markdown.min.js"></script>
<script type="module" src="https://unpkg.com/markdown-style?module"></script>
<markdown-style>
&#x60;&#x60;&#x60;jsx
import React from 'react';
import '@uiw/github-corners';

function Demo() {
return (
  &lt;markdown-style&gt;
    &lt;h1&gt;Markdown Style&lt;/h1&gt;
  &lt;/markdown-style&gt;
);
}
&#x60;&#x60;&#x60;
</markdown-style>
<script>
  const mdstr = document.querySelector('markdown-style');
  mdstr.innerHTML = markdown.default(mdstr.textContent);
</script>
```

## Support dark-mode/night-mode

By default, the [dark-mode](https://github.com/jaywcjlove/dark-mode/) is automatically switched according to the system. If you need to switch manually, just set the `data-color-mode="dark"` parameter for `<html>`.

```html
<html data-color-mode="dark">
```

```js
document.documentElement.setAttribute('data-color-mode', 'dark')
document.documentElement.setAttribute('data-color-mode', 'light')
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/markdown-to-html/graphs/contributors">
  <img src="https://jaywcjlove.github.io/markdown-to-html/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
