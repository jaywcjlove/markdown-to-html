import { VFile } from 'vfile';
import { unified, PluggableList } from 'unified';
import remarkGfm from 'remark-gfm';
import rehypeAttrs from 'rehype-attr';
import remarkParse from 'remark-parse';
import remarkRehype, { Options as RemarkRehypeOptions } from 'remark-rehype';
import rehypeVideo from 'rehype-video';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeRewrite, { RehypeRewriteOptions, getCodeString } from 'rehype-rewrite';
import stringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';

export { getCodeString };

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

function markdown(markdownStr: string = '', options: Options = {}) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(options.remarkPlugins || [])
    .use(remarkRehype, {
      ...options.remarkRehypeOptions,
      allowDangerousHtml: true,
    })
    .use(rehypeVideo)
    .use(rehypeRaw)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeAttrs, { properties: 'attr' })
    .use(rehypeRewrite, {
      rewrite: (node, index, parent) => {
        if (node.type == 'element' && node.tagName === 'code') {
          const { className = [] } = node.properties || {};
          const found = (Array.isArray(className) ? className : [className]).find(
            (str) => String(str).toLocaleLowerCase().indexOf('language-katex') > -1,
          );
          const code = getCodeString(node.children);
          if (found && node.properties) {
            if (Array.isArray(node.properties.className)) {
              if (parent && parent.type === 'element' && parent.properties) {
                parent.properties.className = ['language-katex'];
              }
              node.properties.className.push('math');
              node.properties.className.push('math-display');
              node.children = [
                {
                  type: 'text',
                  value: code,
                },
              ];
            }
          }
          if (/^katex/.test(code.toLocaleLowerCase())) {
            node.properties!.className = ['math', 'math-inline'];
            node.children = [
              {
                type: 'text',
                value: code.replace(/^KaTeX:(\s.)?/i, ''),
              },
            ];
          }
        }

        if (options.rewrite && typeof options.rewrite === 'function') {
          options.rewrite(node, index, parent);
        }
      },
    })
    .use(rehypeKatex)
    .use(options.rehypePlugins || [])
    .use(stringify);

  const file = new VFile();
  file.value = markdownStr;
  const hastNode = processor.runSync(processor.parse(file), file);
  if (options.hastNode) {
    return hastNode;
  }
  return processor.stringify(hastNode, file);
}

export default markdown;
