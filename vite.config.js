import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import matter from "gray-matter";

function markdownPlugin() {
  return {
    name: "vite-plugin-markdown",
    transform(code, id) {
      if (!id.endsWith(".md")) return null;
      const { data, content } = matter(code);
      return {
        code: `export default ${JSON.stringify({ data, content })}`,
        map: null,
      };
    },
  };
}

export default defineConfig({
  base: "/cml_leipzig/",
  plugins: [react(), markdownPlugin()],
  server: {
    host: true,
  },
});
