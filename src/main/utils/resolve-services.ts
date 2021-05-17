/**
 * Dynamically resolves the contents of `./controllers` directory.
 */
(function() {
    // https://webpack.js.org/guides/dependency-management/#requirecontext
    const resolve = (require as any).context('../services', true, /\.ts$/);
    for (const key of resolve.keys()) {
        resolve(key);
    }
})();
