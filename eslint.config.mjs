import { defineConfig, globalIgnores } from 'eslint/config'
import next from 'eslint-config-next'

export default defineConfig([
  globalIgnores([
    '.next/**',
    'node_modules/**',
    'next-env.d.ts',
    // shadcn/ui primitives and their hooks are vendored generated code — lint
    // what we author, not the scaffold. (Nothing under `hooks/` is reachable
    // from the site today; it's only consumed by the unused `ui/sidebar.tsx`.)
    'components/ui/**',
    'hooks/**',
  ]),
  next,
])
