import vinext from "vinext";
import { defineConfig } from "vite";

const localBindings = {
  d1: process.env.CLOUDFLARE_D1_BINDING ?? null,
  r2: process.env.CLOUDFLARE_R2_BINDING ?? null,
};
const placeholderDatabaseId = "00000000-0000-4000-8000-000000000000";
const usePolling = process.env.USE_POLLING_WATCHER === "true";

const localBindingConfig = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  d1_databases: localBindings.d1
    ? [
        {
          binding: localBindings.d1,
          database_name: "sintonia-roleta-d1",
          database_id: placeholderDatabaseId,
        },
      ]
    : [],
  r2_buckets: localBindings.r2
    ? [
        {
          binding: localBindings.r2,
          bucket_name: "sintonia-roleta-r2",
        },
      ]
    : [],
};

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    server: usePolling
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
    ],
  };
});
