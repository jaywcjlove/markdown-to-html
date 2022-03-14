import { PluggableList } from 'unified';
import { Options as RemarkRehypeOptions } from 'remark-rehype';
import { RehypeRewriteOptions, getCodeString } from 'rehype-rewrite';
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
export default function markdown(markdownStr?: string, options?: Options): string | import("hast").Root;
