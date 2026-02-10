import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from './lib/query/queryClient.ts'
import { router } from './router/Router.tsx'
import { reduxStore } from './store/redux/store.ts'
import '@/assets/style/common/common.scss'
import '@/assets/style/common/index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
