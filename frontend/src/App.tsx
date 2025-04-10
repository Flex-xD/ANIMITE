import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';
import { JSX } from 'react';

import Auth from './pages/Auth/Auth';
import TrendingAnimeNews from './pages/News';
import ProfilePage from './pages/Profile/Profile';
import Home from './pages/Home/Home';

interface IRoute {
  path: string;
  element: JSX.Element;
  isPrivate?: boolean;
  redirectTo?: string;
}

const withAuth = (Component: JSX.Element, isPrivate: boolean, redirectTo: string) => {
  const { isAuthenticated } = useAppStore();
  const shouldRender = isPrivate ? isAuthenticated : !isAuthenticated;
  return shouldRender ? Component : <Navigate to={redirectTo} replace />;
};

const routes: IRoute[] = [
  { path: '/', element: <Home />, isPrivate: false },
  { path: '/profile', element: <ProfilePage />, isPrivate: false, redirectTo: '/auth' },
  { path: '/auth', element: <Auth />, isPrivate: false, redirectTo: '/' },
  { path: '/news', element: <TrendingAnimeNews />, isPrivate: true, redirectTo: '/auth' },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={withAuth(route.element, !!route.isPrivate, route.redirectTo || '/')}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;