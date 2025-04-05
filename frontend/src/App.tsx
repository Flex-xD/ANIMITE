import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import { useAppStore } from './store';
import { IprivateRoutes } from './constants/types';
import NewsPage from './pages/News';


const PrivateRoutes = ({ children, requireAuth, redirectTo }: IprivateRoutes) => {
  const { isAuthenticated } = useAppStore();
  console.log("PrivateRoutes - isAuthenticated:", isAuthenticated);
  const shouldRender = requireAuth ? isAuthenticated : !isAuthenticated;
  return shouldRender ? children : <Navigate to={redirectTo} replace />;
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PrivateRoutes requireAuth={true} redirectTo='/auth'><Profile /></PrivateRoutes>} />
        <Route path='/auth' element={<PrivateRoutes requireAuth={false} redirectTo='/'><Auth /></PrivateRoutes>} />
        <Route path='/news' element={<PrivateRoutes requireAuth={true} redirectTo='/auth'><NewsPage/></PrivateRoutes>}/>
        <Route path="*" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
