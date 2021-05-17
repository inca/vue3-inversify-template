export const components: Map<string, any> = new Map();

/**
 * Dynamically registers components listed in `components` directory.
 */
(function() {
    // https://webpack.js.org/guides/dependency-management/#requirecontext
    const resolve = (require as any).context('../components', true, /\.vue$/);
    for (const key of resolve.keys()) {
        const module = resolve(key);
        const name = key.replace(/\.vue$/, '').replace(/[^a-z0-9_-]/gi, '');
        components.set(name, module.default);
    }
})();
