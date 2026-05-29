import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import AuthLayout from './components/AuthLayout.jsx';
import DashLayout from './components/DashLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ArticleListPage from './pages/ArticleListPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import UsersPage from './pages/UsersPage.jsx';
import DashArticleListPage from './pages/DashArticleListPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'articles', element: <ArticleListPage /> },
      { path: 'articles/:name', element: <ArticlePage /> },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage /> },
    ],
  },
  {
    path: 'dashboard',
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'articles', element: <DashArticleListPage /> },
      { path: 'users', element: <UsersPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;