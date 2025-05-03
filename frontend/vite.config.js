import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [
    react(),
    commonjs({
      include: [/ping_pb\.js$/, /ping_grpc_web_pb\.js$/],
      strictRequires: true,
    }),
  ],
});
