import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';
import { JSX } from 'react';

import Auth from './pages/Auth/Auth';
import ProfilePage from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import NewsComponent from './pages/News';
import { IRoute } from './constants/types';

const withAuth = (Component: JSX.Element, isPrivate: boolean, redirectTo: string, allowAuthenticated: boolean = false) => {
  const { isAuthenticated } = useAppStore();
  if (allowAuthenticated) {
    return Component;
  }
  const shouldRender = isPrivate ? isAuthenticated : !isAuthenticated;
  return shouldRender ? Component : <Navigate to={redirectTo} replace />;
};

const routes: IRoute[] = [
  { path: '/', element: <Home />, isPrivate: false, allowAuthenticated: true }, 
  { path: '/profile', element: <ProfilePage />, isPrivate: true, redirectTo: '/auth' },
  { path: '/auth', element: <Auth />, isPrivate: false, redirectTo: '/' },
  { path: '/news', element: <NewsComponent />, isPrivate: true, redirectTo: '/auth' },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={withAuth(route.element, !!route.isPrivate, route.redirectTo || '/', route.allowAuthenticated)}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;