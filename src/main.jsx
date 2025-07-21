import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { GlobalProvider } from './Hooks/GlobalContext.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/Store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainQuestion from './Component/Main/MainQuestion.jsx'
import QuestionAnswer from './Component/QuestionsAnswer/QuestionAnswer.jsx'
import Root from './Component/Root.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    // errorElement : <ErrorElement></ErrorElement>,
    children : [
      {
        path : '/',
        element : <MainQuestion></MainQuestion>,
        loader : ()=> fetch(`/products.json`)
      },
      {
        path : '/answer',
        element : <QuestionAnswer></QuestionAnswer>
      },
    ],
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalProvider >
        <RouterProvider router={router} />
      </GlobalProvider>
    </Provider>
  </React.StrictMode>,
)
