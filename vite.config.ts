import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').at(-1)
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true'
const isUserPage = repositoryName?.endsWith('.github.io')

const base = isGitHubPagesBuild && repositoryName && !isUserPage
  ? `/${repositoryName}/`
  : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    tailwindcss(),
    react()
  ],
})
