// node_modules/nitro/dist/runtime/internal/vite/ssr-renderer.mjs
/** @param {{ req: Request }} HTTPEvent */
function ssrRenderer({ req }) {
	return fetch(req, { viteEnv: "ssr" });
}
export { ssrRenderer as default };
