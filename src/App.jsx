import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// HomePage Structure
import Layout from './components/Layout';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import DashboardPage from './pages/DashboardPage';

import AuthLayout from './components/AuthLayout';
import DashLayout from './components/DashLayout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticleListPage />,
      },
      {
        path: 'articles/:name',
        element: <ArticlePage />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: 'auth/',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;