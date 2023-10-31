import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './page/Home';
import NotFound from './page/NotFound';
import CompanyDetail from './page/CompanyDetail';
import Contact from './page/Contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
      path: "/detail/:id",
      element: <CompanyDetail />,
      errorElement: <NotFound />
  },
  {
    path: "/contact",
    element: <Contact />
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
