import { defineConfig } from 'orval';

export default defineConfig({
  CodeReviewer: {
    output: {
      mode: 'split',
      target: 'api/endpoints/CodeReviewer.ts',
      schemas: 'api/model',
      client: 'react-query',
      mock: false,
      prettier: true,
      override: {
        mutator: {
          path: 'mutator/custom-client.ts',
          name: 'customClient',
        },
      },
    },
    input: {
      target: './openapi.yaml',
    },
    hooks: {
        afterAllFilesWrite: 'prettier --write',
    },
  },
});