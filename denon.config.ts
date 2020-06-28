import { DenonConfig } from "https://deno.land/x/denon/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run src/main.ts",
      desc: "run my app.ts file",
      importmap: "import_map.json",
      allow: [
        "net",
        "write",
        "read",
        "plugin",
      ],
      unstable: true
    },
  },
};

export default config;
