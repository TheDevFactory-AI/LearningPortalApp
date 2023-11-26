import { router } from './src/App';
declare module '@tanstack/react-router' {
    interface Register {
      router: typeof router
    }
  }