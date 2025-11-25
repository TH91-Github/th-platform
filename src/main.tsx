import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { reduxStore } from './store/redux/store.ts'
import { router } from './router/Router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <RouterProvider 
        router={router}
      />
    </Provider>
  </StrictMode>
)
