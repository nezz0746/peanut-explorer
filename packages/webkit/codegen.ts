import { CodegenConfig } from "@graphql-codegen/cli";
import { constants } from "@repo/common";

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "./src/index.ts": {
      schema: constants.subgraphURLs[10],
      documents: "./documents/subgraph.graphql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        reactQueryVersion: 5,
        fetcher: {
          func: "./fetcher#fetcher",
          isReactHook: true,
        },
      },
    },
  },
};

export default config;
